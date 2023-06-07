import { ToastContainer } from "react-toastify";
import NavBar from "./components/NavBar";
import { Outlet, redirect, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { User } from "../../store/models/User.models";
import CartSideBar from "../Rentals/components/CartSideBar/CartSideBar";
import { useEffect } from "react";
import { useTypedDispatch } from "../../store";
import { useDispatch } from "react-redux";
import ChatBox from "../../components/ChatBox/ChatBox";
import ChatBoxIcon from "../../components/ChatBoxIcon/ChatBoxIcon";
import { authActions } from "../../store/auth";
import "../../App.css";
import "react-toastify/dist/ReactToastify.css";
import AnimatedBackground from "./components/AnimateBackground";
const LayoutSecondary = () => {
  const user = useSelector<RootState, User | null>(
    (state) => state.auth.currentUser
  );
  const toggle = useSelector<RootState, boolean>(
    (state) => state.chatbox.toggle
  );

  const images = [
    "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMDIzNi00NGVlLWIzMDYtZTk3MTQ3NGQxZGEwXkEyXkFqcGdeQXVyMzMwOTU5MDk@._V1_.jpg",
    "https://m.media-amazon.com/images/I/71lvJthCRtL.jpg",
    "https://i.etsystatic.com/34708433/r/il/cca72b/4416954418/il_570xN.4416954418_sulh.jpg",
    "https://m.media-amazon.com/images/I/71BokibfVUL.jpg",
    "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg",
    "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
    "https://m.media-amazon.com/images/M/MV5BZjZjNzI5MDctY2Y4YS00NmM4LTljMmItZTFkOTExNGI3ODRhXkEyXkFqcGdeQXVyNjc3MjQzNTI@._V1_.jpg",
    "https://m.media-amazon.com/images/I/51K4w8DY5cL._AC_.jpg",
    "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg",
    "https://m.media-amazon.com/images/M/MV5BMTg1MTY2MjYzNV5BMl5BanBnXkFtZTgwMTc4NTMwNDI@._V1_.jpg",
    "https://img.asmedia.epimg.net/resizer/UnVL_khhoJ7NMuQJT-gPofCatPw=/1472x828/cloudfront-eu-central-1.images.arcpublishing.com/diarioas/U6LVWIVDSRE6HIB5GQQQ3LSAPE.jpg",
    "https://deadline.com/wp-content/uploads/2021/02/Avatar-The-Last-Airbender-Legend-Of-Aang-Nickelodeon-Nick-ATLA-ATLOA-e1655304503771.jpg",
    "https://lumiere-a.akamaihd.net/v1/images/p_frozen_18373_3131259c.jpeg",
    "https://m.media-amazon.com/images/M/MV5BOGZmYjdjN2UtNjAwZi00YmEyLWFhNTEtNjM1OTc5ODg0MGEyXkEyXkFqcGdeQXVyMTA1NjQyNjkw._V1_FMjpg_UX1000_.jpg",
  ];
  return (
    <>
      <AnimatedBackground images={images} />
      <ToastContainer autoClose={1000} theme="colored" />
      {!toggle && user && <ChatBoxIcon />}
      {user && <ChatBox />}
      <CartSideBar />

      <NavBar user={user} />

      <main className="container-main">
        <Outlet />
      </main>
    </>
  );
};
export default LayoutSecondary;
