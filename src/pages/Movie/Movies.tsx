import React, { Component, useState, useEffect, useMemo } from "react";
import { getMovies } from "../../services/movieService";
import { deleteMovie } from "../../store/movies";
import Pagnition from "../../components/common/pagnition";
import { paginate } from "../../utils/paginate";
import ListGroup from "../../components/common/ListGroup/ListGroup";
import { getGenres } from "../../services/genreService";
import MoviesTable from "./components/MoviesTable";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SearchBox from "../../components/common/searchBox";
import { toast } from "react-toastify";
import type { RootState } from "../../store";
import { MovieState } from "../../store/movies";
import { Genre, Movie } from "./../../store/models/Movie.model";
import { movieActions } from "../../store/movies";
import { useTypedDispatch } from "./../../store/index";
import classes from "./Movies.module.css";
const Movies: React.FC = () => {
  const {
    genre,
    movies,
    currentGenre,
    searchQuery,
    pageSize,
    currentPage,
    currentMovie,
    sortColumn,
  } = useSelector<RootState, MovieState>((state) => state.movie);
  const dispatch = useDispatch();
  const dispatchThunk = useTypedDispatch();
  useEffect(() => {}, []);

  const handleDelete = async (movieId: string) => {
    dispatchThunk(deleteMovie(movieId));
  };
  const handleClick = (movie: Movie) => {
    dispatch(movieActions.setClick(movie));
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

  const filtered = useMemo(() => {
    return searchQuery
      ? movies.filter((m) =>
          m.title.toLowerCase().match(searchQuery.toLowerCase())
        )
      : movies.filter((movie) => movie.genreId === currentGenre);
  }, [currentGenre, movies, searchQuery]);

  const sorted = useMemo(
    () =>
      _.orderBy(filtered, [sortColumn.path], [sortColumn.order]).map(
        (movie) => {
          const currentGenre = genre.find(
            (genre) => genre.id === movie.genreId
          );
          return { ...movie, genre: currentGenre };
        }
      ),
    [filtered, genre, sortColumn.order, sortColumn.path]
  );
  const movie = useMemo(
    () => paginate(sorted, currentPage, pageSize),
    [currentPage, pageSize, sorted]
  );

  const handleSearch = (query: string) => {
    dispatch(movieActions.setSearchQuery(query));
  };

  return (
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
            <p>Number of movies: {filtered.length}</p>
            <SearchBox value={searchQuery} onChange={handleSearch} />
            <MoviesTable
              movie={movie}
              onHandleClick={handleClick}
              onHandleDelete={handleDelete}
              onSort={handleSort}
              sortColumn={sortColumn}
            />

            {filtered.length > pageSize ? (
              <Pagnition
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
  );
};

export default Movies;
