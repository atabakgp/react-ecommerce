import { Outlet } from "react-router";
import Header from '../components/Header/Header';

const MainLayout = () => {
  return (
    <div className="MainLayout">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
