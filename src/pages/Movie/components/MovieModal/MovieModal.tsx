import React, { useState, ChangeEvent, FormEvent, UIEventHandler } from "react";
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
import classes from "./MovieModal.module.css";
import TextArea from "../../../../components/common/TextArea/TextArea";
import UploadImage from "../../../../components/common/UploadImage/UploadImage";
import { User } from "../../../../store/models/User.models";
import { toast } from "react-toastify";
import { useGetGenresQuery } from "../../../../store/genreApi";
import {
  useAddAMovieMutation,
  useUpdateAMovieMutation,
} from "../../../../store/movieApi";
import Modal from "../../../../components/common/Modal/Modal";

interface MovieModalProps {
  movie?: Movie | null;
  toggle: boolean;
  onCancel: () => void;
}
const MovieModal: React.FC<MovieModalProps> = ({ toggle, onCancel, movie }) => {
  const mode = movie ? "edit" : "new";
  const [addAMovie, { isLoading, isSuccess }] = useAddAMovieMutation();
  const [updateAMovie, { isLoading: updateMovieLoading }] =
    useUpdateAMovieMutation();

  const { data: genres } = useGetGenresQuery();

  const [imageData, setImageData] = useState<{
    image: string;
    file: File | null;
  }>({ image: "", file: null });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    if (imageData.file) {
      formData.append("image", imageData.file);
    }
    if (mode === "new") {
      await addAMovie(formData);
    } else {
      await updateAMovie({ data: formData, movieId: movie!.id });
    }

    if (!isLoading || !updateMovieLoading) {
      onCancel();
    }
  };

  const selectImageHandler = (image: string, file: File | null) => {
    setImageData((prev) => ({ image: image, file: file }));
  };
  if (!genres) {
    return <></>;
  }

  return (
    <Modal toggle={toggle} onClick={onCancel}>
      <h1>{mode === "new" ? "New movie" : "Edit"}</h1>
      <form onSubmit={handleSubmit} className={classes["movie-form"]}>
        <UploadImage
          getImage={selectImageHandler}
          defaultImage={movie?.image}
        />
        <Input
          name="title"
          label="Title"
          defaultValue={movie?.title}
          type="text"
        />

        <Select
          name={"genreId"}
          defaultValue={movie?.genreId}
          label={"Genre"}
          options={genres}
        />
        <TextArea
          name="description"
          label="Description"
          defaultValue={movie?.description}
        />
        <Input
          name="numberInStock"
          label="Number in Stock"
          defaultValue={movie?.numberInStock}
          type="number"
        />
        <Input
          name="dailyRentalRate"
          label="Rate"
          type="number"
          steps={0.1}
          defaultValue={movie?.dailyRentalRate}
        />
        <button className="btn btn-primary">Save</button>
      </form>
    </Modal>
  );
};

export default MovieModal;
