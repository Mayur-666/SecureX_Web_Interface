// import { useSelector } from "react-redux";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../AppContext";

const ProtectedRoute = () => {
  const { state } = useContext(AppContext);

  return state.isAuth ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;
