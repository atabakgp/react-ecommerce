import { useProducts } from "../hooks/products/useProducts";
import ProductList from "../components/Product/ProductList/ProductList";
import "./Home.scss";


const Home = () => {
  const { isPending, error, data: products } = useProducts(10);

  if (isPending) return;
  if (error) return "An error has occurred: " + error.message;

  const newArrivals = products.products.slice(0,5);
  const recommendation = products.products.slice(5,10);

  return (
    <div className="home">
      <div className="container">
        <div className="home-page-product">
          <ProductList title="New Arrivals" products={newArrivals} />
          <ProductList title="Recommendation" products={recommendation} />
        </div>
      </div>
    </div>
  );
};

export default Home;
