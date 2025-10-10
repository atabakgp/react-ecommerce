import "./Listing.scss";
import {
  useRouteLoaderData,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Categories from "@/components/categories/categories";
import { ICategoryItem } from "@/interfaces/categories";
import { useFetchProductsByCategory } from "@/hooks/products/useProducts";
import ProductList from "@/components/product/productList/productList";

interface ListingProps {}

const Listing = () => {
  const categories = useRouteLoaderData("mainLayout") as ICategoryItem[];
  let categorySlug = useParams().categorySlug as string;
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page") || 1);
  const limit = 20; // 20 per page as requested
  const skip = (pageParam - 1) * limit;

  const {
    data: productsByCategory,
    isPending,
    error,
  } = useFetchProductsByCategory(categorySlug, limit, skip);

  const total = productsByCategory?.total || 0;

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
            <ProductList
              products={productsByCategory?.products}
              total={total}
              pageSize={limit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;
