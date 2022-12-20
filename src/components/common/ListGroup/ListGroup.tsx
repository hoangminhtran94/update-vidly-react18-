import React, { useState } from "react";
import _ from "lodash";
import { Genre } from "../../../store/models/Movie.model";
import Modal from "../../shared/Modal/Modal";
import Input from "../input";
import classes from "./ListGroup.module.css";
import { useDispatch } from "react-redux";
import Joi from "joi";
import { movieActions } from "../../../store/movies";
import { v4 } from "uuid";

interface ListGroupProps {
  genre: Genre[];
  genreCount: number;
  currentGenre: string;
  onGenreChange: (genre: string) => void;
}

const ListGroup: React.FC<ListGroupProps> = (props) => {
  const { genre, genreCount, currentGenre, onGenreChange } = props;
  const dispatch = useDispatch();
  const [genreData, setGenreData] = useState({ id: "", name: "" });
  const [errors, setErrors] = useState<{ [key: string]: string | boolean }>({
    name: "",
  });
  const onChangeHandler = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setGenreData({ ...genreData, name: target.value });
    const error = Joi.string()
      .required()
      .label("Genre name")
      .validate(target.value).error?.details[0].message;
    setErrors({ ...errors, name: error ? error : false });
  };

  const [toggleModal, setToggleModal] = useState(false);
  return (
    <ul className="list-group">
      {genre.map((g) => (
        <li
          key={g.id}
          className={
            g.id === currentGenre ? "list-group-item active" : "list-group-item"
          }
          onClick={() => onGenreChange(g.id)}
          style={{ cursor: "pointer" }}
        >
          {g.name}
        </li>
      ))}
      <li
        key="new-genre"
        style={{ cursor: "pointer" }}
        className={"list-group-item list-group-item-info"}
        onClick={() => {
          setToggleModal(true);
        }}
      >
        New Genre +
      </li>

      <Modal
        toggle={toggleModal}
        onClick={() => {
          setToggleModal(false);
        }}
      >
        <form
          className={classes["new-genre-form"]}
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(movieActions.addAGenre({ ...genreData, id: v4() }));
            setToggleModal(false);
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
