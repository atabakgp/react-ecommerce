import { Link } from "react-router-dom";
import { User } from "@/interfaces/user";

interface UserMenuProps {
  user: User | null;
  onLogout: () => void;
}

const UserMenu = ({ user, onLogout }: UserMenuProps) => {
  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="text-gray-700 hover:text-blue-500 transition-colors"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="text-gray-700 hover:text-blue-500 transition-colors"
        >
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Account Name */}
      <button className="text-gray-700 transition-colors font-medium cursor-pointer">
        My account
      </button>

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <Link
          to="/dashboard"
          className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
        >
          Dashboard
        </Link>
        <button
          onClick={onLogout}
          className="w-full text-left px-4 py-2 cursor-pointer transition-colors text-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
