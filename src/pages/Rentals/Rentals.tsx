import React, { Component } from "react";
import MovieBox from "./components/MovieBox/MovieBox";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Movie } from "../../store/models/Movie.model";
const Rentals = () => {
  const movies = useSelector<RootState, Movie[]>((state) => state.movie.movies);
  if (movies.length === 0) {
    return <h2>There's no movies</h2>;
  }
  return (
    <div className="container">
      <div className="row">
        <h1 className="bg-light text-secondary p-3">Rentals</h1>
      </div>
      <div className="row">
        <div className="col-3">List group</div>
        <div className="col">
          {movies.map((movie, index) => (
            <MovieBox key={index} data={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rentals;
