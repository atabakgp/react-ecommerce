import "./Header.scss";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function Header() {
  const { user } = useUser();

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            Website Logo
          </Link>
        </div>
        <ul className="header-menu">
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
            <li>
              <Link to="/dashboard">{user.displayName}'s Dashboard</Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
