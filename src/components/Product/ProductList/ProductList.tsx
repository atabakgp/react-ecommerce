import React from "react";
import { IProduct } from "../../../interfaces/products";
import ProductItem from "../productItem/productItem";
import "./ProductList.scss";
import Pagination from "@/components/pagination/pagination";

interface ProductListProps {
  title?: string;
  products: IProduct[] | undefined;
  total?: number; // total number of items across all pages
  pageSize?: number; // items per page
}

const ProductList = ({
  title,
  products,
  total,
  pageSize,
}: ProductListProps) => {
  const totalPages =
    total && pageSize ? Math.max(1, Math.ceil(total / pageSize)) : undefined;
  return (
    <section className="container mx-auto my-5 product-list">
      {title && <h2 className="product-list__title">{title}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-5">
        {products &&
          products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
      </div>
      {totalPages && <Pagination totalPages={totalPages} />}
    </section>
  );
};

export default ProductList;
