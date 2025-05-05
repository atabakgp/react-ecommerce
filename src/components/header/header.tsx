import "./Header.scss";
import { Link } from "react-router-dom";


function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link className="" to="/">Website Logo</Link>
        </div>
        <ul className="header-menu">
          <li>
            <Link className="" to="/login">Login</Link>
          </li>
          <li>
            <Link className="" to="/register">Register</Link>
          </li>
          <li>
            <Link className="" to="/dashboard">My Dashboard</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
export default Header;