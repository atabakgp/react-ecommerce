import { Outlet } from "react-router";

const MainLayout = () => {

  return (
    <div className="MainLayout">
      <Outlet />
    </div>
  );
};

export default MainLayout;
