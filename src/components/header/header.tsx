import "./Header.scss";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useLoading } from "../../context/LoadingContext";
import { logoutUser } from "../../services/authServices";
import { useBasket } from "@/context/BasketContext";

function Header() {
  const { user, setUser } = useUser();
  const { basket } = useBasket();
  const totalQuantity = basket.items.reduce((sum, item) => sum + item.quantity, 0);
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
        <div className="search-bar">
          <input
            type="text"
            className="form-control"
            placeholder="search products"
          />
        </div>
        <div className="basket-count">
          <Link to="/cart">Basket ({totalQuantity})</Link>
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
                <Link to="/dashboard">{user.displayName}'s account</Link>
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
