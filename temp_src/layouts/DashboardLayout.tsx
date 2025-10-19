import { Outlet, NavLink } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <nav className="lg:w-1/4 bg-white rounded-lg shadow-md p-4 flex flex-col gap-3">
          <NavLink
            end
            to="/dashboard"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md hover:bg-blue-100 transition-colors ${
                isActive ? "bg-blue-500 text-white" : "text-gray-700"
              }`
            }
          >
            Dashboard Home
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md hover:bg-blue-100 transition-colors ${
                isActive ? "bg-blue-500 text-white" : "text-gray-700"
              }`
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/dashboard/orders"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md hover:bg-blue-100 transition-colors ${
                isActive ? "bg-blue-500 text-white" : "text-gray-700"
              }`
            }
          >
            Orders
          </NavLink>
        </nav>

        {/* Main content */}
        <div className="lg:w-3/4 bg-white rounded-lg shadow-md p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
