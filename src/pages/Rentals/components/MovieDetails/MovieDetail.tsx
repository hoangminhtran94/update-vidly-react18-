import Modal from "../../../../components/common/Modal/Modal";
import { FC, useEffect } from "react";
import { Movie } from "../../../../store/models/Movie.model";
import { usePostCartItemMutation } from "../../../../store/cartApi";
import { useState } from "react";
interface MovieDetailProps {
  movie: Movie;
  toggle: boolean;
  onCancel: () => void;
}

const MovieDetail: FC<MovieDetailProps> = ({ movie, toggle, onCancel }) => {
  const [postCartItem] = usePostCartItemMutation();
  const [itemNumber, setItemNumber] = useState(0);
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
              className="w-[140px] h-[140px] rounded-full shadow-md"
              src={"http://localhost:5000/" + movie.owner?.image}
              alt={movie.owner?.image}
            />
            <div className="flex flex-col gap-2 text-lg font-bold ">
              <p>
                Seller: {`${movie.owner?.firstName} ${movie.owner?.lastName}`}
              </p>
              <p>Location: {movie.owner?.address}</p>
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
