import { Link } from "react-router-dom";
import { User } from "@/interfaces/user";

interface UserMenuProps {
  user: User | null;
  onLogout: () => void;
}

const UserMenu = ({ user, onLogout }: UserMenuProps) => (
  <ul className="header-menu d-flex align-items-center gap-2 list-unstyled mb-0">
    {!user ? (
      <>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </>
    ) : (
      <>
        <li>
          <Link to="/dashboard">{user.displayName}'s account</Link>
        </li>
        <li>
          <button
            className="logout btn btn-link"
            type="button"
            onClick={onLogout}
          >
            Logout
          </button>
        </li>
      </>
    )}
  </ul>
);

export default UserMenu;
