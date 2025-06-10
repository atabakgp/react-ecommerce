import React from "react";
import { IProduct, IProductsResponse } from "../../../interfaces/products";
import ProductItem from "../ProductItem/ProductItem";
import "./ProductList.scss";

interface ProductListProps {
  title?: string;
  products: IProduct[] | undefined;
}

const ProductList = ({ title, products }: ProductListProps) => {
  return (
    <section className="product-list">
      {title && <h2 className="product-list__title">{title}</h2>}
      <div className="row">
        {products &&
          products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
      </div>
    </section>
  );
};

export default ProductList;
