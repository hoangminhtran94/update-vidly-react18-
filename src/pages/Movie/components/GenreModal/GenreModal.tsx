import Joi from "joi";
import React, { FormEvent, useEffect, useState } from "react";
import Modal from "../../../../components/common/Modal/Modal";
import { Genre } from "../../../../store/models/Movie.model";
import {
  useAddAGenreMutation,
  useEditAGenreMutation,
} from "../../../../store/genreApi";
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
  const [addAGenre, { isLoading }] = useAddAGenreMutation();
  const [editAGenre, { isLoading: editIsLoading }] = useEditAGenreMutation();
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name");

    if (data) {
      await editAGenre({ id: data.id, name: name as string });
    } else {
      await addAGenre(name as string);
    }

    if (!isLoading || !editIsLoading) {
      setToggleModal(false);
    }
  };

  return (
    <Modal
      toggle={toggle}
      onClick={() => {
        setToggleModal(false);
      }}
    >
      <form className={classes["new-genre-form"]} onSubmit={submitHandler}>
        <Input defaultValue={data?.name} name={"name"} label={"Genre name"} />
        <button type="submit" className="btn btn-success">
          {data ? "Edit" : "Save"}
        </button>
      </form>
    </Modal>
  );
};
export default GenreModal;
