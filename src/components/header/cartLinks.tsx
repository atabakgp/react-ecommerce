import { Link } from "react-router-dom";

interface CartLinksProps {
  totalQuantity: number;
}

const CartLinks = ({ totalQuantity }: CartLinksProps) => (
  <>
    <div className="basket-count">
      <Link to="/cart">Cart ({totalQuantity})</Link>
    </div>
    <div className="basket-count">
      <Link to="/favorites">Favorites</Link>
    </div>
  </>
);

export default CartLinks;
