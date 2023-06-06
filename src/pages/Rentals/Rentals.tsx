import React, { useState } from "react";
import MovieBox from "./components/MovieBox/MovieBox";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ListGroup from "../../components/common/ListGroup/ListGroup";
import { useDispatch } from "react-redux";
import { movieActions } from "../../store/movies";
import { useGetGenresQuery, useGetMoviesQuery } from "../../store/movieApi";
import { Button, Form } from "react-bootstrap";
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
      return movie.ownerId !== currentUser.id;
    }
    if (filterValue === "allMovies") {
      return movie;
    }
    if (filterValue === "yourMovies") {
      return movie.ownerId === currentUser.id;
    }
  });

  if (movies && movies.length === 0) {
    return (
      <div className=" bg-[rgba(255,255,255,0.8)] flex-1 p-10  shadow-xl shadow-white">
        <h2 className="">There's no movies</h2>
      </div>
    );
  }
  if (!movies || !genre) {
    return (
      <div className=" bg-[rgba(255,255,255,0.8)] flex-1 p-10  shadow-xl shadow-white">
        <h2 className="">There's no movies</h2>
      </div>
    );
  }
  if (movieIsLoading || genreIsLoading) {
    return (
      <div className=" bg-[rgba(255,255,255,0.8)] flex-1 p-10  shadow-xl shadow-white">
        <h2 className="">Loading...</h2>
      </div>
    );
  }
  return (
    <div className=" bg-[rgba(255,255,255,0.8)] flex-1 p-10  shadow-xl shadow-white">
      <div className="row">
        <h1 className="text-secondary p-3">Rentals</h1>
      </div>

      <div className="row my-4">
        <div className="col d-flex gap-4 justify-content-end">
          <Form.Select
            className="w-25"
            onChange={(e) => {
              handleGenreChange(e.target.value);
            }}
          >
            <option value="all">All Genre</option>
            {genre.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </Form.Select>
          {currentUser && (
            <>
              <Button
                variant="outline-success"
                onClick={() => {
                  setFilterValue("availableMovies");
                }}
                value="availableMovies"
              >
                Available movies
              </Button>

              <Button
                variant="outline-warning"
                onClick={() => {
                  setFilterValue("allMovies");
                }}
              >
                All movies
              </Button>

              <Button
                variant="outline-dark"
                onClick={() => {
                  setFilterValue("yourMovies");
                }}
                value="yourMovies"
              >
                Your movies
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="row">
        <div className="grid grid-cols-3 gap-5">
          {filteredMoviesByList?.length === 0 ? (
            <h1>No movie available</h1>
          ) : (
            filteredMoviesByList?.map((movie, index) => (
              <MovieBox key={index} data={movie} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Rentals;
