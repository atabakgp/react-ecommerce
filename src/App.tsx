import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router";
import Header from "./components/Header/Header";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import useAuthObserver from "./hooks/auth/useAuthObserver";
import Spinner from "./components/Spinner/Spinner";
import { useLoading } from "./context/LoadingContext";

function App() {
  useAuthObserver();
  const { loading } = useLoading();

  return (
    <div className="App">
      {loading && <Spinner />}
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
