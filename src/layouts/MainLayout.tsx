import { Outlet } from "react-router";
import Header from '../components/Header/Header';

const MainLayout = () => {
  return (
    <div className="MainLayout">
      <Header />
      <Outlet />  {/* This will render child routes like Home */}
    </div>
  );
};

export default MainLayout;
