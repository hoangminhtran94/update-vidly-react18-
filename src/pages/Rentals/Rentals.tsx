import React, { useState } from "react";
import MovieBox from "./components/MovieBox/MovieBox";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ListGroup from "../../components/common/ListGroup/ListGroup";
import { useDispatch } from "react-redux";
import { movieActions } from "../../store/movies";
import { useGetGenresQuery, useGetMoviesQuery } from "../../store/movieApi";
import { Form } from "react-bootstrap";
import { User } from "../../store/models/User.models";
const Rentals = () => {
  const dispatch = useDispatch();
  const [filterValue, setFilterValue] = useState("availableMovies");
  const { data: movies, isLoading: movieIsLoading } = useGetMoviesQuery();
  const { data: genre, isLoading: genreIsLoading } = useGetGenresQuery();

  const currentGenre = useSelector<RootState, string>(
    (state) => state.movie.currentGenre
  );
  const currentUser = useSelector<RootState, User | null>(
    (state) => state.auth.currentUser
  );

  const handleGenreChange = (genre: string) => {
    dispatch(movieActions.setGenre(genre));
  };

  const fileredMoviesByGenre = !movies
    ? undefined
    : currentGenre === "all"
    ? movies
    : movies.filter((movies) => movies.genreId === currentGenre);

  const filteredMoviesByList = fileredMoviesByGenre?.filter((movie) => {
    if (!currentUser) {
      return movie;
    }
    if (filterValue === "availableMovies") {
      return movie.userId !== currentUser.id;
    }
    if (filterValue === "allMovies") {
      return movie;
    }
    if (filterValue === "yourMovies") {
      return movie.userId === currentUser.id;
    }
  });

  if (movies && movies.length === 0) {
    return <h2>There's no movies</h2>;
  }
  if (!movies || !genre) {
    return <div>No data</div>;
  }
  if (!filteredMoviesByList) {
    return <></>;
  }
  if (movieIsLoading || genreIsLoading) {
    return <div>Loading</div>;
  }
  return (
    <div className="container rounded shadow-sm p-4">
      <div className="row">
        <h1 className="text-secondary p-3">Rentals</h1>
      </div>
      {currentUser && (
        <div className="row my-4">
          <div className="col d-flex justify-content-end">
            <Form.Select
              className="w-25"
              defaultValue="availableMovies"
              onChange={(e) => {
                setFilterValue((e.target as HTMLSelectElement).value);
              }}
            >
              <option value="allMovies">All movies</option>
              <option value="availableMovies">Available movies</option>
              <option value="yourMovies">Your movies</option>
            </Form.Select>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-3">
          <ListGroup
            genreCount={genre.length}
            genre={genre}
            currentGenre={currentGenre}
            onGenreChange={handleGenreChange}
          />
        </div>
        <div className="col-9">
          {filteredMoviesByList.length === 0 ? (
            <h1>No movie available</h1>
          ) : (
            filteredMoviesByList.map((movie, index) => (
              <MovieBox key={index} data={movie} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Rentals;
