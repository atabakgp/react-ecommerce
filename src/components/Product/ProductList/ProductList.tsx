import React from "react";
import { IProduct } from "../../../interfaces/products";
import ProductItem from "../productItem/productItem";
import Pagination from "@/components/pagination/pagination";

interface ProductListProps {
  title?: string;
  products: IProduct[] | undefined;
  total?: number;
  pageSize?: number;
  mdCols?: number; // allowed Tailwind grid cols
}

const ProductList = ({
  title,
  products,
  total,
  pageSize,
  mdCols = 5, // default 5 columns
}: ProductListProps) => {
  const totalPages =
    total && pageSize ? Math.max(1, Math.ceil(total / pageSize)) : undefined;

  // Tailwind class mapping
  const mdGridClass = `md:grid-cols-${mdCols}`;

  return (
    <section className="container mx-auto my-5">
      {title && <h2 className="text-xl font-semibold mb-16">{title}</h2>}

      <div className={`grid grid-cols-2 ${mdGridClass} gap-5`}>
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
