import {
  useRouteLoaderData,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Categories from "@/components/categories/categories";
import { ICategoryItem } from "@/interfaces/categories";
import { useFetchProductsByCategory } from "@/hooks/products/useProducts";
import ProductList from "@/components/product/productList/productList";

const Listing = () => {
  const categories = useRouteLoaderData("mainLayout") as ICategoryItem[];
  const categorySlug = useParams().categorySlug as string;
  const [searchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page") || 1);
  const limit = 20; // 20 per page
  const skip = (pageParam - 1) * limit;

  const {
    data: productsByCategory,
    isPending,
    error,
  } = useFetchProductsByCategory(categorySlug, limit, skip);

  const total = productsByCategory?.total || 0;

  return (
    <div className="products-listing bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 flex gap-6">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0">
          <Categories categories={categories} mode="sidebar" />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {isPending && <div className="text-gray-500">Loading...</div>}

          {error && (
            <div className="text-red-500">Failed to load products.</div>
          )}

          <ProductList
            products={productsByCategory?.products}
            total={total}
            pageSize={limit}
          />
        </main>
      </div>
    </div>
  );
};

export default Listing;
