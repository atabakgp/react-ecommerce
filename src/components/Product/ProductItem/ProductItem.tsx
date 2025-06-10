import { IProduct } from "@/interfaces/products";
import "./ProductItem.scss";
import StarRating from "./StarRating";
import { Link } from "react-router-dom";

interface IProductItemProps {
  product: IProduct;
}
const ProductItem = ({ product }: IProductItemProps) => {
  const slugGenerator = (text: string): string => {
    const slug = text.toLowerCase().replace(/\s+/g, "-");
    return slug;
  };

  const urlGenerator = (product: IProduct): string => {
    const titleSlug = product.title ? `/${slugGenerator(product.title)}` : "";
    const brandSlug = product.brand ? `/${slugGenerator(product.brand)}` : "";
    const url = `${brandSlug}${titleSlug}/${product.id}`;
    return url;
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
    </Link>
  );
};
export default ProductItem;
