import { useContext } from "react";
import { AppContext } from "../AppContext";
import { Link, useNavigate } from "react-router-dom";
import SpeedDial from "./SpeedDial";

function Navbar() {

  const {state} = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className=" h-20 text-xl fixed w-full bg-gray-100 z-10 flex items-center justify-between">
      <img className="w-44 ml-5 cursor-pointer" src="./logo.png" onClick={() => navigate("/")} />
      {
        !state.isAuth ? <Link to={"/auth"} className="mr-5 border-2 py-2 px-4 text-center rounded-lg text-white bg-gray-800 hover:text-black hover:bg-white hover:border-gray-700">Sign In</Link> : <SpeedDial />
      }
    </div>
  )
}

export default Navbar;