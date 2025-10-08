import { Outlet, NavLink } from "react-router-dom";
import "./DashboardLayout.scss";

const DashboardLayout = () => {
  return (
    <div className="DashboardLayout">
      <div className="container">
        <div className="row">
          <nav className="col-lg-3 dashboard-nav">
            <NavLink
              end
              to="/dashboard"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Dashboard Home
            </NavLink>

            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Profile
            </NavLink>

            <NavLink
              to="/dashboard/orders"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Orders
            </NavLink>
          </nav>
          <div className="col-lg-9">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
