import Joi from "joi";
import React, { useEffect, useState } from "react";
import Modal from "../../../../components/common/Modal/Modal";
import { Genre } from "../../../../store/models/Movie.model";
import {
  useAddAGenreMutation,
  useEditAGenreMutation,
} from "../../../../store/movieApi";
import Input from "../../../../components/common/Input/Input";
import classes from "./GenreModal.module.css";
interface GenreModalProps {
  toggle: boolean;
  setToggleModal: (toggle: boolean) => any;
  data?: Genre;
}

const GenreModal: React.FC<GenreModalProps> = ({
  toggle,
  setToggleModal,
  data,
}) => {
  const [genreData, setGenreData] = useState({ id: "", name: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    name: "",
  });
  useEffect(() => {
    if (data) {
      setGenreData(data);
    }
  }, [data]);
  const [addAGenre, { isLoading }] = useAddAGenreMutation();
  const [editAGenre, { isLoading: editIsLoading }] = useEditAGenreMutation();
  const onChangeHandler = ({
    target,
  }: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >) => {
    setGenreData({ ...genreData, name: target.value });
    const error = Joi.string()
      .required()
      .label("Genre name")
      .validate(target.value).error?.details[0].message;
    setErrors({ ...errors, name: error ? error : "n/a" });
  };

  return (
    <Modal
      toggle={toggle}
      onClick={() => {
        setToggleModal(false);
      }}
    >
      <form
        className={classes["new-genre-form"]}
        onSubmit={async (e) => {
          e.preventDefault();
          if (data) {
            await editAGenre(genreData);
          } else {
            await addAGenre(genreData);
          }

          if (!isLoading || !editIsLoading) {
            setToggleModal(false);
          }
        }}
      >
        <Input
          value={genreData.name}
          name={"genre"}
          label={"Genre name"}
          error={errors.name}
          onChange={onChangeHandler}
        />
        <button type="submit" className="btn btn-success">
          {data ? "Edit" : "Save"}
        </button>
      </form>
    </Modal>
  );
};
export default GenreModal;
