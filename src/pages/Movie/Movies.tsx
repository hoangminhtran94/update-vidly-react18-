import React, { useEffect, useMemo, useState } from "react";

import Pagination from "../../components/common/Pagination/Pagination";
import { paginate } from "../../utils/paginate";
import ListGroup from "../../components/common/ListGroup/ListGroup";
import { redirect, useLoaderData } from "react-router-dom";
import MoviesTable from "./components/MovieTable/MoviesTable";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SearchBox from "../../components/common/SearchBox/SearchBox";
import { toast } from "react-toastify";
import type { RootState } from "../../store";
import { MovieState } from "../../store/movies";
import { Movie } from "./../../store/models/Movie.model";
import { movieActions } from "../../store/movies";
import classes from "./Movies.module.css";
import { User } from "../../store/models/User.models";
import { useGetGenresQuery } from "../../store/genreApi";
import {
  useDeleteMovieMutation,
  useGetYourMoviesQuery,
} from "../../store/movieApi";
import MovieModal from "./components/MovieModal/MovieModal";
import { Navigate } from "react-router-dom";
import { useGetCartItemsQuery } from "../../store/cartApi";
const Movies: React.FC = () => {
  const { data: movies, error } = useGetYourMoviesQuery();
  const { data: genre } = useGetGenresQuery();
  useGetCartItemsQuery();
  const [deleteMovie] = useDeleteMovieMutation();
  const {
    currentGenre,
    searchQuery,
    pageSize,
    currentPage,
    currentMovie,
    sortColumn,
  } = useSelector<RootState, MovieState>((state) => state.movie);
  const [toggleForm, setToggleForm] = useState(false);
  const currentUser = useSelector<RootState, User>(
    (state) => state.auth.currentUser!
  );

  const dispatch = useDispatch();

  const handleDelete = async (movieId: string) => {
    await deleteMovie(movieId);
  };

  const handlePageChange = (page: number) => {
    dispatch(movieActions.setCurrentPage(page));
  };

  const handleGenreChange = (genre: string) => {
    dispatch(movieActions.setGenre(genre));
  };

  const handleSort = (sortColumn: { path: string; order: "asc" | "desc" }) => {
    dispatch(movieActions.setSort(sortColumn));
  };
  //Temporary movies

  const filtered = useMemo(() => {
    if (!movies) {
      return [];
    }
    return searchQuery
      ? movies.filter((m) =>
          m.title.toLowerCase().match(searchQuery.toLowerCase())
        )
      : currentGenre === "all"
      ? movies
      : movies.filter((movie) => movie.genreId === currentGenre);
  }, [currentGenre, movies, searchQuery]);

  const sorted = useMemo(
    () =>
      _.orderBy(filtered, [sortColumn.path], [sortColumn.order]).map(
        (movie) => {
          if (!genre) {
            return;
          }
          const currentGenre = genre.find(
            (genre) => genre.id === movie.genreId
          );
          return { ...movie, genre: currentGenre };
        }
      ),
    [filtered, genre, sortColumn.order, sortColumn.path]
  );
  const movie: Movie[] = useMemo(
    () => paginate(sorted, currentPage, pageSize),
    [currentPage, pageSize, sorted]
  );

  const handleSearch = (query: string) => {
    dispatch(movieActions.setSearchQuery(query));
  };

  if (!movies || !genre) {
    return (
      <div className=" bg-[rgba(255,255,255,0.8)] flex-1 p-10  shadow-xl shadow-white">
        <h2 className="">Error happened</h2>
      </div>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <div className=" bg-[rgba(255,255,255,0.8)] flex-1 p-10  shadow-xl shadow-white">
      <div className={`row `}>
        <div className="col-3">
          <ListGroup
            genreCount={genre.length}
            genre={genre}
            currentGenre={currentGenre}
            onGenreChange={handleGenreChange}
          />
        </div>
        <div className="col">
          <button
            className="btn btn-primary"
            onClick={() => {
              setToggleForm(true);
            }}
          >
            New movie
          </button>

          {filtered.length === 0 ? (
            <h2 className={classes["invalid-message"]}>
              There is not any movie in database
            </h2>
          ) : (
            <>
              <p className="mt-2 fw-bold">
                Number of movies: {filtered.length}
              </p>
              <SearchBox value={searchQuery} onSearch={handleSearch} />
              <MoviesTable
                movie={movie}
                onHandleClick={() => {}}
                onHandleDelete={handleDelete}
                onSort={handleSort}
                sortColumn={sortColumn}
              />

              {filtered.length > pageSize ? (
                <Pagination
                  itemCount={filtered.length}
                  pageSize={pageSize}
                  onPageChange={handlePageChange}
                  currentPage={currentPage}
                />
              ) : (
                ""
              )}
            </>
          )}
        </div>
      </div>
      <MovieModal
        toggle={toggleForm}
        onCancel={() => {
          setToggleForm(false);
        }}
      />
    </div>
  );
};

export default Movies;

export const loader = async () => {
  const token = localStorage.getItem("token");
  let user = null;
  try {
    const data = await fetch(
      process.env.REACT_APP_SERVER_API + "user/validate-token",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    user = await data.json();
  } catch (e) {
    return redirect("/");
  }

  if (!user || !token) {
    return redirect("/login");
  }
  return user;
};
