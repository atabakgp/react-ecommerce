import { useProducts } from "../hooks/products/useProducts";
import ProductList from "../components/Product/ProductList/ProductList";
import "./Home.scss";
import { useCategories } from "@/context/CategoriesContext";
import Categories from "@/components/Categories/Categories";

const Home = () => {
  const { isPending, error, data: products } = useProducts(15);
  const { categories } = useCategories();

  if (isPending) return;
  if (error) return "An error has occurred: " + error.message;

  const newArrivals = products.products.slice(0, 5);
  const recommendation = products.products.slice(5, 10);
  const popularProducts = products.products.slice(10, 15);

  return (
    <div className="home">
      <div className="container">
        <Categories categories={categories} />
        <div className="home-page-product">
          <ProductList title="New Arrivals" products={newArrivals} />
          <ProductList title="Recommendation" products={recommendation} />
          <ProductList title="Popular Products" products={popularProducts} />
        </div>
      </div>
    </div>
  );
};

export default Home;
