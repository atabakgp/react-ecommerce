import "./Listing.scss";
import { useRouteLoaderData } from "react-router-dom";
import Categories from "@/components/Categories/Categories";
import { ICategoryItem } from "@/interfaces/categories";

interface ListingProps {}

const Listing = () => {
  const categories = useRouteLoaderData("mainLayout") as ICategoryItem[];

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
