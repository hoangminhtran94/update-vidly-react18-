import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import auth from "../../../services/authService";
import Like from "../../../components/common/like";
import Table from "../../../components/common/table";
import { Movie } from "../../../store/models/Movie.model";

interface MovieTableProps {
  onHandleClick: Function;
  onHandleDelete: Function;
  movie: Movie[];
  sortColumn: any;
  onSort: any;
}

const MoviesTable: React.FC<MovieTableProps> = (props) => {
  const [columns, setColumn] = useState([
    {
      label: "Title",
      path: "title",
      content: (movie: Movie) => (
        <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
      ),
    },
    { label: "Genre", path: "genre.name" },
    { label: "Stock", path: "numberInStock" },
    { label: "Rate", path: "dailyRentalRate" },
    {
      key: "like",
      content: (movie: Movie) => (
        <Like
          isClick={movie.isClick}
          onClick={() => props.onHandleClick(movie)}
        />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          onClick={() => props.onHandleDelete(movie.id)}
          className="btn btn-danger btn-sm m-2"
        >
          Delete
        </button>
      ),
    },
  ]);

  useEffect(() => {
    const user: any = auth.getCurrentUser();
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
    <Table
      columns={columns}
      data={movie}
      sortColumn={sortColumn}
      onSort={onSort}
    />
  );
};

export default MoviesTable;
