import { Outlet } from "react-router";
import Header from "@/components/header/header";
// import "bootstrap/dist/css/bootstrap.min.css";
import useAuthObserver from "./hooks/auth/useAuthObserver";
import Spinner from "./components/spinner/spinner";
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
