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

  // Map mdCols to Tailwind classes
  let mdGridClass = "grid-cols-2"; // default
  if (mdCols === 1) mdGridClass = "grid-cols-1";
  else if (mdCols === 2) mdGridClass = "grid-cols-2";
  else if (mdCols === 3) mdGridClass = "grid-cols-3";
  else if (mdCols === 4) mdGridClass = "grid-cols-4";
  else if (mdCols === 5) mdGridClass = "grid-cols-5";
  else if (mdCols === 6) mdGridClass = "grid-cols-6";
  else if (mdCols === 7) mdGridClass = "grid-cols-7";

  return (
    <section className="container mx-auto">
      {title && <h2 className="text-xl font-semibold mb-16">{title}</h2>}

      <div className={`grid ${mdGridClass} gap-5`}>
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
