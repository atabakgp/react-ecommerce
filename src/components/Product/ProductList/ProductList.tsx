import React from "react";
import { IProduct } from "../../../interfaces/products";
import ProductItem from "../ProductItem/ProductItem";
import "./ProductList.scss";

interface ProductListProps {
  title: string;
  products: IProduct[];
}

const ProductList: React.FC<ProductListProps> = ({ title, products }) => {
  return (
    <section>
      <h2>{title}</h2>
      <div className="product-list row">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
