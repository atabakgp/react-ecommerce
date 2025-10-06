import { IProduct } from "@/interfaces/products";
import "./ProductItem.scss";
import StarRating from "./StarRating";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useFavoritesContext } from "@/context/FavoriteContext";
import { auth } from "@/firebase/firebase";

interface IProductItemProps {
  product: IProduct;
}

const ProductItem = ({ product }: IProductItemProps) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavoritesContext();

  const slugGenerator = (text: string): string => {
    return text.toLowerCase().replace(/\s+/g, "-");
  };

  const urlGenerator = (product: IProduct): string => {
    const titleSlug = product.title ? `/${slugGenerator(product.title)}` : "";
    const brandSlug = product.brand ? `/${slugGenerator(product.brand)}` : "";
    return `${brandSlug}${titleSlug}/${product.id}`;
  };

  const handleToggleFavorite = (
    event: React.MouseEvent,
    productId: number
  ): void => {
    event.preventDefault();
    event.stopPropagation();
    if (!auth.currentUser) navigate("/login");
    toggleFavorite(productId);
  };

  return (
    <Link className="col-lg-2 product-item" to={urlGenerator(product)}>
      <div className="product-image">
        <img src={product.thumbnail} alt={product.title} />
      </div>
      <div className="product-content">
        <div className="product-title">{product.title}</div>
        <div className="product-description">{product.description}</div>
        <div className="product-price">{product.price} $</div>
        <div className="product-rating">
          <span className="rating-count">{product.rating}</span>
          <StarRating rating={product.rating} />
        </div>
      </div>
      <button
        className="favorite-icon"
        onClick={(e) => handleToggleFavorite(e, product.id)}
      >
        {isFavorite(product.id) ? (
          <FaHeart color="red" size="1.3em" />
        ) : (
          <FaRegHeart size="1.3em" />
        )}
      </button>
    </Link>
  );
};

export default ProductItem;
