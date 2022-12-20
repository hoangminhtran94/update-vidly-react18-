import React, { useState, ChangeEvent, FormEvent } from "react";
import Form from "../../../../components/common/form";
import { getGenres } from "../../../../services/genreService";
import { getMovie, saveMovie } from "../../../../services/movieService";
import Joi from "joi";
import { useNavigate, useParams } from "react-router-dom";
import { Genre, Movie } from "../../../../store/models/Movie.model";
import Input from "../../../../components/common/input";
import Select from "../../../../components/common/select";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { v4 } from "uuid";
import { useDispatch } from "react-redux";
import { movieActions } from "../../../../store/movies";
import _ from "lodash";
import classes from "./MovieForm.module.css";
const schema: { [key: string]: any } = {
  id: Joi.string(),
  title: Joi.string().required().label("Title"),
  genreId: Joi.string().required().label("Genre"),
  numberInStock: Joi.number()
    .required()
    .min(0)
    .max(100)
    .label("Number in Stock"),
  dailyRentalRate: Joi.number()
    .required()
    .min(0)
    .max(10)
    .label("Daily Rental Rate"),
};

const MovieForm: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const genres = useSelector<RootState, Genre[]>((state) => state.movie.genre);
  const movies = useSelector<RootState, Movie[]>((state) => state.movie.movies);
  const currentMovie = movies.find((movie) => movie.id === id);
  const initialMovieData = {
    id: currentMovie?.id || "",
    title: currentMovie?.title || "",
    dailyRentalRate: currentMovie?.dailyRentalRate || 0,
    numberInStock: currentMovie?.numberInStock || 0,
    genreId: currentMovie?.genreId || "",
  };
  const [movieData, setMovieData] = useState(initialMovieData);
  const [errors, setErrors] = useState<{ [key: string]: string | boolean }>({
    title: "",
    dailyRentalRate: "",
    numberInStock: "",
    genreId: "",
  });
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (id === "new") {
      dispatch(movieActions.addAMovie({ ...movieData, id: v4() }));
    } else {
      dispatch(movieActions.editAMovie(movieData));
    }
    navigate("/movies");
  };
  const validateProperty = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    const { error } = schema[name].validate(value);
    return error ? error.details[0].message : false;
  };

  const onChangeHandler = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const errorMessage = validateProperty(target);
    setErrors((prev) => (prev = { ...prev, [target.name]: errorMessage }));
    setMovieData((prev) => (prev = { ...prev, [target.name]: target.value }));
  };

  return (
    <div className={classes["movie-form-container"]}>
      <h1>{id === "new" ? "New movie" : "Edit"}</h1>
      <form onSubmit={handleSubmit} className={classes["movie-form"]}>
        <Input
          name="title"
          label="Title"
          value={movieData.title}
          type="text"
          error={errors.title}
          onChange={onChangeHandler}
        />
        <Select
          name={"genreId"}
          onChange={onChangeHandler}
          value={movieData.genreId}
          label={"Genre"}
          error={errors.genreId}
          options={genres}
        />
        <Input
          name="numberInStock"
          label="Number in Stock"
          value={movieData.numberInStock}
          type="number"
          error={errors.numberInStock}
          onChange={onChangeHandler}
        />
        <Input
          name="dailyRentalRate"
          label="Rate"
          type="number"
          value={movieData.dailyRentalRate}
          error={errors.dailyRentalRate}
          onChange={onChangeHandler}
        />
        <button
          className="btn btn-primary"
          disabled={
            _.isEqual(movieData, initialMovieData) ||
            !Object.values(errors).every((item) => item === false)
          }
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
