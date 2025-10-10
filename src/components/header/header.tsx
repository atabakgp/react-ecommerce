// Header.tsx
import "./Header.scss";
import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { useCart } from "@/context/CartContext";
import { authService } from "@/services/auth/authService";
import SearchBar from "./searchBar";
import CartLinks from "./cartLinks";
import UserMenu from "./userMenu";

function Header() {
  const { user, setUser } = useUser();
  const { cart } = useCart();
  const totalQuantity = cart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="header">
      <div className="container m-auto">
        <div className="logo">
          <Link to="/">Website Logo</Link>
        </div>

        <SearchBar />

        <div className="d-flex align-items-center gap-3">
          <CartLinks totalQuantity={totalQuantity} />
        </div>

        <UserMenu user={user} onLogout={handleLogout} />
      </div>
    </header>
  );
}

export default Header;
