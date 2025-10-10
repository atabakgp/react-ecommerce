import { useQueries } from "@tanstack/react-query";
import { useFavoritesContext } from "@/context/FavoriteContext";
import { getProductById } from "@/services/products/productService";
import { IProduct } from "@/interfaces/products";
import ProductList from "@/components/product/productList/productList";
import { useSearchParams } from "react-router-dom";

const Favorites = () => {
  const { favoriteIds } = useFavoritesContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page") || 1);
  const pageSize = 20; // 20 per page as requested

  // run one query per favoriteId
  const results = useQueries({
    queries: favoriteIds.map((id) => ({
      queryKey: ["product", id],
      queryFn: () => getProductById(id),
      enabled: Boolean(id),
      staleTime: 1000 * 60 * 10, // 10 min: cache considered fresh
      refetchOnMount: false, // don’t refetch when returning to page
      refetchOnWindowFocus: false, // don’t refetch when switching tabs
    })),
  });

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);

  const products: IProduct[] = results
    .map((r) => (r.isSuccess ? r.data : null))
    .filter(Boolean) as IProduct[];

  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  const start = (pageParam - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = products.slice(start, end);

  return (
    <div className="container favorites-page">
      {isLoading && <p>Loading favorites...</p>}
      {isError && <p>Could not load some favorites.</p>}
      {!isLoading && products.length === 0 && (
        <p className="py-4">No favorite products yet.</p>
      )}

      {products.length > 0 && (
        <ProductList
          title="My Favorites"
          products={pageItems}
          total={products.length}
          pageSize={pageSize}
        />
      )}
    </div>
  );
};

export default Favorites;
