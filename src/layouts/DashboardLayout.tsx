import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="DashboardLayout">
      <Outlet />  {/* This will render child routes like Dashboard */}
    </div>
  );
};

export default DashboardLayout;
