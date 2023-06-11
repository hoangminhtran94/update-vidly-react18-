import React, { useState } from "react";
import classes from "./MovieBox.module.css";
import { Button } from "react-bootstrap";
import { Movie } from "../../../../store/models/Movie.model";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { User } from "../../../../store/models/User.models";
import { useTypedDispatch } from "./../../../../store/index";
import { usePostCartItemMutation } from "../../../../store/cartApi";
import MovieDetail from "../MovieDetails/MovieDetail";
interface MovieBoxProps {
  data: Movie;
}
const MovieBox: React.FC<MovieBoxProps> = ({ data }) => {
  const [postCartItem] = usePostCartItemMutation();
  const [toggleViewMovie, setToggleViewMovie] = useState(false);
  const dispatchThunk = useTypedDispatch();
  const currentUser = useSelector<RootState, User | null>(
    (state) => state.auth.currentUser
  );
  return (
    <div
      className={`container  p-3 hover:scale-105 transition-all cursor-pointer bg-dark-gradient ${classes["movie-box-container"]}`}
    >
      <div className="flex relative gap-3">
        <div
          className="absolute top-0 left-0 w-full h-full"
          onClick={() => {
            setToggleViewMovie(true);
          }}
        />
        <div className="d-flex justify-content-center flex-col gap-2 justify-between">
          <div className={classes["image-container"]}>
            <img alt="movieImage" src={data.image} />
          </div>
          <p className={classes["price"]}>${data.dailyRentalRate}/day</p>
          <p>{data.numberInStock} in stock</p>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <h3>{data.title}</h3>
          <div className={classes["movie-details"]}>
            <p className={`${classes["description"]} flex-1 line-clamp-6`}>
              {data.description}
            </p>
          </div>

          <Button
            className="mt-4 z-10"
            disabled={!!(currentUser && data.ownerId === currentUser.id)}
            size="sm"
            variant={
              !!(currentUser && data.ownerId === currentUser.id)
                ? "secondary"
                : "primary"
            }
            onClick={() => {
              postCartItem({ movieId: data.id, quantity: 1 });
            }}
          >
            {!!(currentUser && data.ownerId === currentUser.id)
              ? "Your movie"
              : "Add to buy cart +"}
          </Button>
        </div>
      </div>
      <MovieDetail
        movie={data}
        toggle={toggleViewMovie}
        onCancel={() => {
          setToggleViewMovie(false);
        }}
      />
    </div>
  );
};
export default MovieBox;
