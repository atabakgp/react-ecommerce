import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

const PublicRoute = () => {
  const { user, loading } = useUser();
  return !user ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default PublicRoute;
