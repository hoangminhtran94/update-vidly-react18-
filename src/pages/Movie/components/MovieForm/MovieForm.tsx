import React, { useState, ChangeEvent, FormEvent } from "react";
import { getGenres } from "../../../../services/genreService";
import { getMovie, saveMovie } from "../../../../services/movieService";
import Joi from "joi";
import { useNavigate, useParams } from "react-router-dom";
import { Genre, Movie } from "../../../../store/models/Movie.model";
import Input from "../../../../components/common/Input/Input";
import Select from "../../../../components/common/Select/Select";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { v4 } from "uuid";
import { useDispatch } from "react-redux";
import { movieActions } from "../../../../store/movies";
import _ from "lodash";
import classes from "./MovieForm.module.css";
import TextArea from "../../../../components/common/TextArea/TextArea";
import UploadImage from "../../../../components/common/UploadImage/UploadImage";
import { User } from "../../../../store/models/User.models";
import { toast } from "react-toastify";
import {
  useAddAMovieMutation,
  useGetGenresQuery,
  useGetMoviesQuery,
  useUpdateAMovieMutation,
} from "../../../../store/movieApi";

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
  description: Joi.string().required().label("Description"),
};

const MovieForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [addAMovie, { isLoading, isSuccess }] = useAddAMovieMutation();
  const [updateAMovie, { isLoading: updateMovieLoading }] =
    useUpdateAMovieMutation();
  const currentUser = useSelector<RootState, User>(
    (state) => state.auth.currentUser!
  );
  const { data: genres } = useGetGenresQuery();
  const { data: movies } = useGetMoviesQuery();

  const currentMovie = movies && movies.find((movie) => movie.id === id);
  const intialError = id !== "new" ? "n/a" : "";
  const initialMovieData = {
    id: currentMovie?.id || "",
    title: currentMovie?.title || "",
    dailyRentalRate: currentMovie?.dailyRentalRate || 0,
    description: currentMovie?.description || "",
    image: currentMovie?.image || "",
    numberInStock: currentMovie?.numberInStock || 0,
    genreId: currentMovie?.genreId || "",
    file: null,
    userId: currentUser.id,
  };
  const [movieData, setMovieData] = useState<Movie & { file: File | null }>(
    initialMovieData
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    title: intialError,
    dailyRentalRate: intialError,
    numberInStock: intialError,
    genreId: intialError,
    description: intialError,
  });
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", movieData.title);
    formData.append("numberInStock", movieData.numberInStock.toString());
    formData.append("dailyRentalRate", movieData.numberInStock.toString());
    formData.append("description", movieData.description);
    if (movieData.file) {
      formData.append("image", movieData.file);
    }
    formData.append("genreId", movieData.genreId!);
    if (id === "new") {
      await addAMovie(formData);
    } else {
      formData.append("id", movieData.id);
      await updateAMovie(formData);
    }

    if (!isLoading || !updateMovieLoading) {
      navigate("/movies");
    }
  };
  const validateProperty = ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) => {
    const { error } = schema[name].validate(value);
    return error ? error.details[0].message : "n/a";
  };

  const onChangeHandler = ({
    target,
  }: ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >) => {
    const errorMessage = validateProperty(target);
    setErrors((prev) => (prev = { ...prev, [target.name]: errorMessage }));
    setMovieData((prev) => (prev = { ...prev, [target.name]: target.value }));
  };
  const selectImageHandler = (image: string, file: File | null) => {
    setMovieData((prev) => (prev = { ...prev, image: image, file: file }));
  };
  if (!genres) {
    return <></>;
  }
  return (
    <div className={`${classes["movie-form-container"]} rounded p-4`}>
      <h1 className="bg-light text-secondary">
        {id === "new" ? "New movie" : "Edit"}
      </h1>
      <form onSubmit={handleSubmit} className={classes["movie-form"]}>
        <UploadImage getImage={selectImageHandler} image={movieData.image} />
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
        <TextArea
          name="description"
          label="Description"
          value={movieData.description}
          error={errors.description}
          onChange={onChangeHandler}
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
            !Object.values(errors).every((item) => item === "n/a")
          }
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
