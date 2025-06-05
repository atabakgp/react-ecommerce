import "./Listing.scss";
import NavBar from "@/components/Categories/Categories";
import { useCategories } from "@/context/CategoriesContext";
import Categories from "@/components/Categories/Categories";

interface ListingProps {}

const Listing = () => {
  const { categories } = useCategories();
  return (
    <div className="products-listing">
      <Categories categories={categories} />
      <div className="container">
        <h2>Listing</h2>
      </div>
    </div>
  );
};

export default Listing;
