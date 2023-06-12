import React, { useEffect, useState } from "react";
import Table from "../../../../components/common/Table/Table";
import { Movie } from "../../../../store/models/Movie.model";
import MovieModal from "../MovieModal/MovieModal";
import { useSelector } from "react-redux";
import { useTypedDispatch } from "../../../../store";
import { movieActions } from "../../../../store/movies";
import { RootState } from "../../../../store";

interface MovieTableProps {
  onHandleClick: Function;
  onHandleDelete: Function;
  movie: Movie[];
  sortColumn: any;
  onSort: any;
}

const MoviesTable: React.FC<MovieTableProps> = (props) => {
  const currentMovie = useSelector<RootState>(
    (state) => state.movie.currentEditMovie
  );
  const dispatch = useTypedDispatch();

  const [toggleModal, setToggleModal] = useState(false);
  const [columns, setColumn] = useState([
    {
      label: "Title",
      path: "title",
    },
    { label: "Genre", path: "genre.name" },
    { label: "Stock", path: "numberInStock" },
    { label: "Rate", path: "dailyRentalRate" },

    {
      key: "edit",
      content: (movie: Movie) => (
        <button
          className="btn btn-info text-white btn-sm"
          onClick={() => {
            setToggleModal(true);
            dispatch(movieActions.setCurrentMovie(movie));
          }}
        >
          Edit
        </button>
      ),
    },

    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => props.onHandleDelete(movie.id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ]);

  useEffect(() => {
    // const user: any = auth.getCurrentUser();
    // if (user && user.isAdmin) {
    //   setColumn(
    //     (prev) =>
    //       (prev = [
    //         ...prev,
    //         {
    //           key: "delete",
    //           content: (movie) => (
    //             <button
    //               onClick={() => props.onHandleDelete(movie)}
    //               className="btn btn-danger btn-sm m-2"
    //             >
    //               Delete
    //             </button>
    //           ),
    //         },
    //       ])
    //   );
    // }
  }, []);

  const { movie, sortColumn, onSort } = props;

  return (
    <>
      <Table
        columns={columns}
        data={movie}
        sortColumn={sortColumn}
        onSort={onSort}
      />
      <MovieModal
        toggle={toggleModal}
        movie={currentMovie as Movie | null}
        onCancel={() => {
          setToggleModal(false);
          dispatch(movieActions.setCurrentMovie(null));
        }}
      />
    </>
  );
};

export default MoviesTable;
