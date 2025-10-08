import { useProducts } from "../hooks/products/useProducts";
import ProductList from "../components/Product/ProductList/ProductList";
import "./Home.scss";
import Categories from "@/components/Categories/Categories";
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
      <div className="container">
        <div className="home-page-products">
          <ProductList title="New Arrivals" products={newArrivals} total={total} pageSize={pageSize} />
        </div>
      </div>
    </div>
  );
};

export default Home;
