import Modal from "../../../../components/common/Modal/Modal";
import { FC, useEffect } from "react";
import { Movie } from "../../../../store/models/Movie.model";
import { usePostCartItemMutation } from "../../../../store/cartApi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { chatboxActions } from "../../../../store/chatbox";
import { Button } from "react-bootstrap";
import { messageApiSlice } from "./../../../../store/messageApi";

interface MovieDetailProps {
  movie: Movie;
  toggle: boolean;
  onCancel: () => void;
}

const MovieDetail: FC<MovieDetailProps> = ({ movie, toggle, onCancel }) => {
  const [postCartItem] = usePostCartItemMutation();
  const [itemNumber, setItemNumber] = useState(0);
  const dispatch = useDispatch();
  const [bounce, setBounce] = useState(false);
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    if (itemNumber >= 0 || itemNumber <= 20) {
      setBounce(true);
      timeout = setTimeout(() => {
        setBounce(false);
      }, 200);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [itemNumber]);
  return (
    <Modal
      toggle={toggle}
      onClick={onCancel}
      className="!p-0 !grid grid-cols-2 h-[800px] !w-[80vw]"
    >
      <div className="flex flex-col ">
        <div className="flex-1 basis-[100px] overflow-hidden shadow-md">
          <img
            className="w-full h-full  rounded-tl-md object-cover "
            src={"http://localhost:5000/" + movie.image}
            alt={movie.image}
          />
        </div>
        <div className="flex  flex-1 basis-0 ">
          <div className="flex gap-5 p-[40px] h-fit items-center ">
            <img
              className="w-[140px] h-[140px] rounded-full shadow-md object-cover"
              src={"http://localhost:5000/" + movie.owner?.image}
              alt={movie.owner?.image}
            />
            <div className="flex flex-col gap-2 text-lg font-bold ">
              <p>
                Seller: {`${movie.owner?.firstName} ${movie.owner?.lastName}`}{" "}
              </p>
              <p>Location: {movie.owner?.address}</p>
              <Button
                variant="outline-success"
                className=" cursor-pointer hover:scale-105 transition-all !flex justify-center gap-2 "
                onClick={() => {
                  dispatch(chatboxActions.openChatBox());
                  dispatch(chatboxActions.setCurrentReceiver(movie.owner));
                }}
              >
                Chat now
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.98 10.79V14.79C17.98 15.05 17.97 15.3 17.94 15.54C17.71 18.24 16.12 19.58 13.19 19.58H12.79C12.54 19.58 12.3 19.7 12.15 19.9L10.95 21.5C10.42 22.21 9.56 22.21 9.03 21.5L7.82999 19.9C7.69999 19.73 7.41 19.58 7.19 19.58H6.79001C3.60001 19.58 2 18.79 2 14.79V10.79C2 7.86001 3.35001 6.27001 6.04001 6.04001C6.28001 6.01001 6.53001 6 6.79001 6H13.19C16.38 6 17.98 7.60001 17.98 10.79Z"
                    className=" stroke-current"
                    strokeWidth="1.5"
                    stroke-miterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21.98 6.79001V10.79C21.98 13.73 20.63 15.31 17.94 15.54C17.97 15.3 17.98 15.05 17.98 14.79V10.79C17.98 7.60001 16.38 6 13.19 6H6.79004C6.53004 6 6.28004 6.01001 6.04004 6.04001C6.27004 3.35001 7.86004 2 10.79 2H17.19C20.38 2 21.98 3.60001 21.98 6.79001Z"
                    className=" stroke-current"
                    strokeWidth="1.5"
                    stroke-miterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.4955 13.25H13.5045"
                    className=" stroke-current"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.9955 13.25H10.0045"
                    className=" stroke-current"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.4955 13.25H6.5045"
                    className=" stroke-current"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-4">
        <div className="flex-1 basis-[100px]">
          <h2>{movie.title}</h2>
          <h4>About</h4>
          <p>{movie.description}</p>
        </div>
        <div className=" flex gap-3 flex-col flex-1  font-extrabold p-4">
          <h4>Number in stock: {movie.numberInStock}</h4>
          <h4>Rental price: ${movie.dailyRentalRate}/day</h4>
          <h4>Total price: ${itemNumber * +movie.dailyRentalRate}</h4>
          <div className="flex gap-5 items-center">
            <div className="flex transition-all">
              <button
                className="w-[40px] h-[40px] bg-slate-100 flex justify-center items-center hover:scale-105 cursor-pointer"
                onClick={() => {
                  setItemNumber((prev) => {
                    if (prev - 1 >= 0) {
                      return prev - 1;
                    }
                    return 0;
                  });
                }}
              >
                -
              </button>
              <input
                defaultValue={"0"}
                type="number"
                min={0}
                max={+movie.numberInStock}
                value={itemNumber}
                onChange={(e) => {
                  if (
                    +e.target.value >= 0 &&
                    +e.target.value <= +movie.numberInStock
                  ) {
                    setItemNumber(+e.target.value);
                  }
                }}
                className={`w-[40px] h-[40px] p-1  border border-slate-100  text-center  hover:scale-105 cursor-pointer ${
                  bounce && "bounce"
                }`}
              />

              <button
                className="w-[40px] h-[40px] bg-slate-100  flex justify-center items-center hover:scale-105 cursor-pointer"
                onClick={() => {
                  setItemNumber((prev) => {
                    if (prev + 1 <= +movie.numberInStock) {
                      return prev + 1;
                    }

                    return +movie.numberInStock;
                  });
                }}
              >
                +
              </button>
            </div>
            <button
              className="bg-[#242368] text-[20px] font-bold text-white p-3 hover:bg-[#302f72] hover:scale-105 transition-all  rounded-full  !w-fit"
              onClick={() => {
                postCartItem({ movieId: movie.id, quantity: itemNumber });
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MovieDetail;
