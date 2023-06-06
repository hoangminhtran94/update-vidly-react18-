import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" flex flex-col text-white ">
      <div className="min-h-[800px] bg-mainpage-first-section bg-no-repeat bg-cover flex items-center p-5 flex-wrap">
        <div className="flex-1 flex flex-col gap-[83px] ">
          <h1 className="text-[96px] font-bold">
            Welcome to Vidly Rent a movie now
          </h1>
          <Link
            className="bg-[#242368] text-[36px] font-bold text-white px-[115px] hover:bg-[#302f72] hover:scale-105 transition-all py-[35px] rounded-full !w-fit mx"
            to="register"
          >
            Register now
          </Link>
        </div>
        <img
          src="/images/home-img.png"
          className="object-contain w-[980px]"
          alt="home-img"
        />
      </div>
      <div className="h-[800px] bg-mainpage-second-section bg-no-repeat bg-cover flex items-center p-5">
        <div className="flex-1 flex flex-col gap-[83px]">
          <h1 className="text-[96px] font-bold">Rent a movie</h1>
        </div>
        <div className="flex-1 flex flex-col gap-[30px]">
          <p className="font-bold text-[40px]">
            Unlock a world of entertainment: Rent your favorite movies today!
          </p>
          <Link
            className="bg-[#242368] text-[36px] font-bold text-white px-[115px] hover:bg-[#302f72] hover:scale-105 transition-all py-[35px]  rounded-full  !w-fit mx"
            to="rentals"
          >
            Rent now
          </Link>
        </div>
      </div>
      <div className="h-[800px] bg-mainpage-third-section bg-no-repeat bg-cover flex items-center p-5">
        <div className="flex-1 flex flex-col gap-[83px]">
          <h1 className="text-[96px] font-bold">Start your business</h1>
        </div>
        <div className="flex-1 flex flex-col gap-[30px]">
          <p className="font-bold text-[40px]">
            Turn your passion for movies into a profitable business: Rent out
            your film collection today!
          </p>
          <Link
            className="bg-[#242368] text-[36px] font-bold text-white px-[115px] hover:bg-[#302f72] hover:scale-105 transition-all py-[35px]  rounded-full  !w-fit mx"
            to="login"
          >
            Start now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
