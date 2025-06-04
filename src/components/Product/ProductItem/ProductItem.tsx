import { IProduct } from "../../../interfaces/products";
import "./ProductItem.scss";
import StarRating from "./StarRating";

interface IProductItemProps {
  product: IProduct;
}
const ProductItem = ({ product }: IProductItemProps) => {
  return (
    <div className="col-lg-2 product-item">
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
    </div>
  );
};
export default ProductItem;
