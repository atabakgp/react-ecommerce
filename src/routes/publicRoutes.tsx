import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

const PublicRoute = () => {
  const { user } = useUser();
  return !user ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default PublicRoute;
