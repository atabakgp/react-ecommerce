import { Routes, Route } from "react-router-dom";
import { Outlet } from "react-router";
import Header from "./components/Header/Header";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
