import { IProduct } from "../../../interfaces/products";
import "./ProductItem.scss";

interface IProductItemProps {
  product: IProduct;
}
 const ProductItem = ({ product }: IProductItemProps) => {
  return (
    <div className="col-lg-2 product-item">
        <div>
            <img src={product.thumbnail} alt={product.title} />
        </div>
        <div className="product-title">{product.title}</div>
    </div>
  );
};
export default ProductItem;
