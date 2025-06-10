import "./Listing.scss";
import { useRouteLoaderData, useParams } from "react-router-dom";
import Categories from "@/components/Categories/Categories";
import { ICategoryItem } from "@/interfaces/categories";
import { useFetchProductsByCategory } from "@/hooks/products/useProducts";
import ProductList from "@/components/Product/ProductList/ProductList";

interface ListingProps {}

const Listing = () => {
  const categories = useRouteLoaderData("mainLayout") as ICategoryItem[];
  let categorySlug = useParams().categorySlug as string;
  const {
    data: productsByCategory,
    isPending,
    error,
  } = useFetchProductsByCategory(categorySlug);

  return (
    <div className="products-listing">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <Categories categories={categories} mode="sidebar" />
            <div>Filters</div>
          </div>
          <div className="col-lg-10">
            {isPending && <div>Loading...</div>}
            <ProductList products={productsByCategory?.products} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
