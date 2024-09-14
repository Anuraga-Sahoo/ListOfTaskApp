import React from "react";
import banner from '/Banner.svg'
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="hero text-black flex justify-around items-center h-[80vh] ">
      <div className="heading flex gap-3 flex-col">
        <h2 className="text-5xl font-bold">Your Personal Task Manager</h2>
        <p className="text-xl">Stay organized and accomplish your goals with ease.</p>
        <div className="mt-5">
          <Link to="/app" className="text-xl bg-black text-white rounded-md p-3  hover:bg-zinc-900">Get started</Link>
        </div>
      </div>
      <div className="image">
        <img src={banner} alt="" className="h-[20rem]" />
      </div>
    </div>
  );
};

export default Home;
