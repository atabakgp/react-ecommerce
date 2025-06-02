import "./Header.scss";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useLoading } from "../../context/LoadingContext";
import { logoutUser } from "../../services/authServices";

function Header() {
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">Website Logo</Link>
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
            <>
              <li>
                <Link to="/dashboard">{user.displayName}'s Dashboard</Link>
              </li>
              <button className="logout" type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
