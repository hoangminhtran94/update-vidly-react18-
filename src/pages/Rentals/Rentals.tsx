import React from "react";
import MovieBox from "./components/MovieBox/MovieBox";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ListGroup from "../../components/common/ListGroup/ListGroup";
import { useDispatch } from "react-redux";
import { movieActions } from "../../store/movies";
import { useGetGenresQuery, useGetMoviesQuery } from "../../store/movieApi";
const Rentals = () => {
  const dispatch = useDispatch();
  const { data: movies, isLoading: movieIsLoading } = useGetMoviesQuery();
  const { data: genre, isLoading: genreIsLoading } = useGetGenresQuery();

  const currentGenre = useSelector<RootState, string>(
    (state) => state.movie.currentGenre
  );

  const handleGenreChange = (genre: string) => {
    dispatch(movieActions.setGenre(genre));
  };

  const currentMovies =
    currentGenre === "all"
      ? movies
      : movies!.filter((movies) => movies.genreId === currentGenre);
  if (movies && movies.length === 0) {
    return <h2>There's no movies</h2>;
  }
  if (!movies || !genre) {
    return <div>No data</div>;
  }
  if (movieIsLoading || genreIsLoading) {
    return <div>Loading</div>;
  }
  return (
    <div className="container">
      <div className="row">
        <h1 className="bg-light text-secondary p-3">Rentals</h1>
      </div>
      <div className="row">
        <div className="col-2">
          <ListGroup
            genreCount={genre!.length}
            genre={genre!}
            currentGenre={currentGenre}
            onGenreChange={handleGenreChange}
          />
        </div>
        <div className="col">
          {currentMovies!.map((movie, index) => (
            <MovieBox key={index} data={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rentals;
