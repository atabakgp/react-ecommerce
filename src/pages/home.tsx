import { useProducts } from "../hooks/products/useProducts";
import ProductList from "../components/product/productList/productList";
import "./home.scss";
import Categories from "@/components/categories/categories";
import { ICategoryItem } from "@/interfaces/categories";
import { useRouteLoaderData, useSearchParams } from "react-router-dom";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page") || 1);
  const pageSize = 20; // 20 per page as requested
  const skip = (pageParam - 1) * pageSize;

  const { isPending, error, data } = useProducts(pageSize, skip);
  const categories = useRouteLoaderData("mainLayout") as ICategoryItem[];

  if (isPending) return;
  if (error) return "An error has occurred: " + error.message;

  const newArrivals = data.products; // server returns page-size items
  const total = data.total || 0;

  return (
    <div className="home">
      <div className="home-page-categories">
        <Categories categories={categories.slice(0, 12)} />
      </div>
      <div className="container mx-auto">
        <ProductList
          products={newArrivals}
          total={total}
          pageSize={pageSize}
          mdCols={6}
        />
      </div>
    </div>
  );
};

export default Home;
