import "./Header.scss";
import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { authService } from "@/services/auth/authService";
import { useCart } from "@/context/CartContext";
import { useState, useRef, useEffect } from "react";
import { useSearchProducts } from "@/hooks/products/useProducts";
import SearchDropdown from "@/components/SearchDropDown/SearchDropDown";

function Header() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(""); // New state for debounced query
  const { data: searchProducts } = useSearchProducts(debouncedQuery);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, setUser } = useUser();
  const { cart } = useCart();
  const totalQuantity = cart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const searchRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchChange = (value: string) => {
    setQuery(value);
    setShowDropdown(value.length > 0);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const products = searchProducts?.products || [];

  return (
    <header className="header">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="logo">
          <Link to="/">Website Logo</Link>
        </div>

        {/* Search bar */}
        <div className="search-bar position-relative" ref={searchRef}>
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => query && setShowDropdown(true)}
          />

          {showDropdown && products.length > 0 && (
            <SearchDropdown
              products={products}
              onSelect={() => setShowDropdown(false)}
            />
          )}
        </div>

        {/* Cart & Favorites */}
        <div className="d-flex align-items-center gap-3">
          <div className="basket-count">
            <Link to="/cart">Cart ({totalQuantity})</Link>
          </div>

          <div className="basket-count">
            <Link to="/favorites">Favorites</Link>
          </div>
        </div>

        {/* User menu */}
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
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
