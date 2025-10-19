// Header.tsx
import "./header.scss";
import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { useCart } from "@/context/CartContext";
import { authService } from "@/services/auth/authService";
import SearchBar from "./searchBar";
import CartLinks from "./cartLinks";
import UserMenu from "./userMenu";
import { FaReact } from "react-icons/fa6";

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
    <header className="flex header py-4 shadow-md mb-4 bg-white">
      <div className="container mx-auto">
        <div className="logo">
          <Link to="/">
            <FaReact size="3em" />
          </Link>
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
