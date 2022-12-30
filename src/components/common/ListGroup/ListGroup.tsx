import React, { useState } from "react";
import { Genre } from "../../../store/models/Movie.model";
import classes from "./ListGroup.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import GenreModal from "./GenreModal/GenreModal";
import { useLocation } from "react-router-dom";
interface ListGroupProps {
  genre: Genre[];
  genreCount: number;
  currentGenre: string;
  onGenreChange: (genre: string) => void;
}

const ListGroup: React.FC<ListGroupProps> = (props) => {
  const location = useLocation();

  const token = useSelector<RootState, string | null>(
    (state) => state.auth.token
  );
  const { genre, genreCount, currentGenre, onGenreChange } = props;
  const [data, setData] = useState<Genre | undefined>();
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
      >
        <p
          className="m-0"
          onClick={() => {
            onGenreChange("all");
          }}
        >
          All Genre
        </p>
      </li>
      {genre.map((g) => (
        <li
          key={g.id}
          className={`${
            g.id === currentGenre
              ? "list-group-item bg-dark text-white"
              : "list-group-item"
          } p-3`}
          style={{ position: "relative" }}
        >
          <p
            className="m-0"
            onClick={() => {
              onGenreChange(g.id);
            }}
            style={{ cursor: "pointer" }}
          >
            {g.name}
          </p>

          {token && location.pathname !== "/rentals" && (
            <span
              className={classes["edit-icon"]}
              onClick={() => {
                setToggleModal(true);
                setData(g);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="currentColor"
                className="bi bi-pencil"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
              </svg>
            </span>
          )}
        </li>
      ))}
      {token && location.pathname !== "/rentals" && (
        <li
          key="new-genre"
          style={{ cursor: "pointer" }}
          className={"list-group-item list-group-item-secondary p-3"}
          onClick={() => {
            setToggleModal(true);
            setData(undefined);
          }}
        >
          New Genre +
        </li>
      )}
      <GenreModal
        toggle={toggleModal}
        setToggleModal={setToggleModal}
        data={data}
      />
    </ul>
  );
};

export default ListGroup;
