import React, { Component } from "react";
import MovieBox from "./components/MovieBox/MovieBox";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Genre, Movie } from "../../store/models/Movie.model";
import ListGroup from "../../components/common/ListGroup/ListGroup";
import { useDispatch } from "react-redux";
import { movieActions } from "../../store/movies";

const Rentals = () => {
  const dispatch = useDispatch();
  const movies = useSelector<RootState, Movie[]>((state) => state.movie.movies);
  const genre = useSelector<RootState, Genre[]>((state) => state.movie.genre);
  const currentGenre = useSelector<RootState, string>(
    (state) => state.movie.currentGenre
  );

  const handleGenreChange = (genre: string) => {
    dispatch(movieActions.setGenre(genre));
  };

  const currentMovies =
    currentGenre === "all"
      ? movies
      : movies.filter((movies) => movies.genreId === currentGenre);
  if (movies.length === 0) {
    return <h2>There's no movies</h2>;
  }
  return (
    <div className="container">
      <div className="row">
        <h1 className="bg-light text-secondary p-3">Rentals</h1>
      </div>
      <div className="row">
        <div className="col-2">
          <ListGroup
            genreCount={genre.length}
            genre={genre}
            currentGenre={currentGenre}
            onGenreChange={handleGenreChange}
          />
        </div>
        <div className="col">
          {currentMovies.map((movie, index) => (
            <MovieBox key={index} data={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rentals;
