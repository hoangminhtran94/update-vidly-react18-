import React, { useState } from "react";
import classes from "./MovieBox.module.css";
import { Button } from "react-bootstrap";
import { Movie } from "../../../../store/models/Movie.model";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { User } from "../../../../store/models/User.models";
import Modal from "../../../../components/common/Modal/Modal";
import { cartActions, postACartItem } from "../../../../store/cart";
import { TypedDispatch } from "../../../../store";
import { useTypedDispatch } from "./../../../../store/index";
interface MovieBoxProps {
  data: Movie;
}
const MovieBox: React.FC<MovieBoxProps> = ({ data }) => {
  const [toggleModal, setToggleModal] = useState(false);
  const dispatchThunk = useTypedDispatch();
  const currentUser = useSelector<RootState, User | null>(
    (state) => state.auth.currentUser
  );
  return (
    <div
      className={`container mb-3 mt-3 p-3 ${classes["movie-box-container"]}`}
    >
      <div className="row">
        <div className="col-3 d-flex justify-content-center">
          <div className={classes["image-container"]}>
            <img alt="movieImage" src={`http://localhost:5000/${data.image}`} />
          </div>
        </div>
        <div className="col">
          <h3>{data.title}</h3>
          <div className={classes["movie-details"]}>
            <p className={classes["description"]}>{data.description}</p>
            <p className={classes["price"]}>${data.dailyRentalRate}/day</p>
          </div>
          <div className={classes["actions"]}>
            <Button
              style={{ marginRight: "16px" }}
              variant="primary"
              onClick={() => {
                currentUser
                  ? dispatchThunk(postACartItem(data.id, 1))
                  : setToggleModal(true);
              }}
            >
              Add to buy cart +
            </Button>
            {/* <Button variant="info" style={{ marginRight: "16px" }}>
              Add to rental +
            </Button> */}
          </div>
        </div>
      </div>
      <Modal
        toggle={toggleModal}
        onClick={() => {
          setToggleModal(false);
        }}
      >
        <h1>You are not logged in. Login now?</h1>
        <Button variant="primary">To login</Button>
      </Modal>
    </div>
  );
};
export default MovieBox;
