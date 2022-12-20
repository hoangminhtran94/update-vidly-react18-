import React from "react";
import classes from "./MovieBox.module.css";
import { Button } from "react-bootstrap";
import { Movie } from "../../../../store/models/Movie.model";
interface MovieBoxProps {
  data: Movie;
}
const MovieBox: React.FC<MovieBoxProps> = ({ data }) => {
  return (
    <div
      className={`container mb-3 mt-3 p-3 ${classes["movie-box-container"]}`}
    >
      <div className="row">
        <div className={`col-3`}>
          <div className={classes["image-container"]}>
            <img alt="movieImage" src={data.image} />
          </div>
        </div>
        <div className="col">
          <h3>{data.title}</h3>
          <div className={classes["movie-details"]}>
            <p className={classes["description"]}>{data.description}</p>
            <p className={classes["price"]}>${data.dailyRentalRate}/day</p>
          </div>
          <div className={classes["actions"]}>
            <Button style={{ marginRight: "16px" }} variant="primary">
              Add to buy cart +
            </Button>
            <Button variant="info" style={{ marginRight: "16px" }}>
              Add to rental +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieBox;
