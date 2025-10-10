import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useLoading } from "../context/LoadingContext";

import Spinner from "../components/spinner/spinner";

const PrivateRoute = () => {
  const { user } = useUser();
  const { loading } = useLoading();

  if (loading) {
    return <Spinner />;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
