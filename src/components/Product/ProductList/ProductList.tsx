import React from "react";
import { IProduct, IProductsResponse } from "../../../interfaces/products";
import ProductItem from "../ProductItem/ProductItem";
import "./ProductList.scss";

interface ProductListProps {
  title: string;
  products: IProduct[] | undefined;
}

const ProductList = ({ title, products }: ProductListProps) => {
  return (
    <section>
      <h2>{title}</h2>
      <div className="product-list row">
        {products && products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductList;
