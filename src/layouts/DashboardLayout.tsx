import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="DashboardLayout">
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
