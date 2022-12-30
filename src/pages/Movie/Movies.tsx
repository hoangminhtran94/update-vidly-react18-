import React, { useEffect, useMemo } from "react";

import Pagination from "../../components/common/Pagination/Pagination";
import { paginate } from "../../utils/paginate";
import ListGroup from "../../components/common/ListGroup/ListGroup";

import MoviesTable from "./components/MoviesTable";
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
import {
  useGetGenresQuery,
  useGetMoviesQuery,
  useDeleteMovieMutation,
} from "../../store/movieApi";
const Movies: React.FC = () => {
  const { data: movies, error } = useGetMoviesQuery();
  const { data: genre } = useGetGenresQuery();
  const [deleteMovie] = useDeleteMovieMutation();
  const {
    currentGenre,
    searchQuery,
    pageSize,
    currentPage,
    currentMovie,
    sortColumn,
  } = useSelector<RootState, MovieState>((state) => state.movie);
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

  const temporaryMovies =
    movies && movies.filter((movie) => movie.userId === currentUser.id);

  const filtered = useMemo(() => {
    if (!temporaryMovies) {
      return [];
    }
    return searchQuery
      ? temporaryMovies.filter((m) =>
          m.title.toLowerCase().match(searchQuery.toLowerCase())
        )
      : currentGenre === "all"
      ? temporaryMovies
      : temporaryMovies.filter((movie) => movie.genreId === currentGenre);
  }, [currentGenre, searchQuery, temporaryMovies]);

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
    return <div>Error</div>;
  }
  return (
    <div className="container">
      <div className={`row rounder p-4 ${classes["movies-container"]}`}>
        <div className="col-3">
          <ListGroup
            genreCount={genre.length}
            genre={genre}
            currentGenre={currentGenre}
            onGenreChange={handleGenreChange}
          />
        </div>
        <div className="col">
          {true && (
            <Link className="btn btn-primary" to="/movies/new">
              New movie
            </Link>
          )}

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
    </div>
  );
};

export default Movies;
