import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

const PrivateRoute = () => {
  const { user, loading } = useUser();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
