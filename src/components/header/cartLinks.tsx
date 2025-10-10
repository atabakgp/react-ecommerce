import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

interface CartLinksProps {
  totalQuantity: number;
}

const CartLinks = ({ totalQuantity }: CartLinksProps) => (
  <div className="flex items-center gap-4">
    {/* Cart Link */}
    <Link
      to="/cart"
      className="flex items-center gap-1 text-gray-700 hover:text-blue-500 transition-colors"
    >
      <FaShoppingCart className="w-5 h-5" />
      <span>({totalQuantity})</span>
    </Link>

    {/* Favorites Link */}
    <Link
      to="/favorites"
      className="flex items-center gap-1 text-gray-700 hover:text-red-500 transition-colors"
    >
      <FaHeart className="w-5 h-5" />
    </Link>
  </div>
);

export default CartLinks;
