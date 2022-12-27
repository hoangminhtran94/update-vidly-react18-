import React, { useState } from "react";
import _ from "lodash";
import { Genre } from "../../../store/models/Movie.model";
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import classes from "./ListGroup.module.css";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";
import { RootState } from "../../../store";
import { movieActions } from "../../../store/movies";
import { v4 } from "uuid";
import { toast } from "react-toastify";

interface ListGroupProps {
  genre: Genre[];
  genreCount: number;
  currentGenre: string;
  onGenreChange: (genre: string) => void;
}

const ListGroup: React.FC<ListGroupProps> = (props) => {
  const dispatch = useDispatch();
  const token = useSelector<RootState, string | null>(
    (state) => state.auth.token
  );
  const { genre, genreCount, currentGenre, onGenreChange } = props;
  const [genreData, setGenreData] = useState({ id: "", name: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    name: "",
  });
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

  const [toggleModal, setToggleModal] = useState(false);
  return (
    <ul className="list-group">
      <li
        key="all-genre"
        style={{ cursor: "pointer" }}
        className={`${
          currentGenre === "all"
            ? "list-group-item bg-dark text-white"
            : "list-group-item"
        } p-3`}
        onClick={() => {
          onGenreChange("all");
        }}
      >
        All Genre
      </li>
      {genre.map((g) => (
        <li
          key={g.id}
          className={`${
            g.id === currentGenre
              ? "list-group-item bg-dark text-white"
              : "list-group-item"
          } p-3`}
          onClick={() => onGenreChange(g.id)}
          style={{ cursor: "pointer" }}
        >
          {g.name}
        </li>
      ))}
      {token && (
        <li
          key="new-genre"
          style={{ cursor: "pointer" }}
          className={"list-group-item list-group-item-secondary p-3"}
          onClick={() => {
            setToggleModal(true);
          }}
        >
          New Genre +
        </li>
      )}
      <Modal
        toggle={toggleModal}
        onClick={() => {
          setToggleModal(false);
        }}
      >
        <form
          className={classes["new-genre-form"]}
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const response = await fetch(
                "http://localhost:5000/api/movies/genre",
                {
                  method: "POST",
                  body: JSON.stringify({ name: genreData.name }),
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                  },
                }
              );
              if (response.ok) {
                const genre = await response.json();
                // dispatch(movieActions.addAGenre(genre));
                setToggleModal(false);
              } else {
                const result = await response.json();
                throw new Error(result.message);
              }
            } catch (error: any) {
              toast(error.message, { type: "error" });
            }
          }}
        >
          <Input
            name={"genre"}
            label={"Genre name"}
            error={errors.name}
            onChange={onChangeHandler}
          />
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </form>
      </Modal>
    </ul>
  );
};

export default ListGroup;
