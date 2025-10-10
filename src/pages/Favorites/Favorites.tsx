import { useQueries } from "@tanstack/react-query";
import { useFavoritesContext } from "@/context/FavoriteContext";
import { getProductById } from "@/services/products/productService";
import { IProduct } from "@/interfaces/products";
import ProductList from "@/components/product/productList/productList";
import { useSearchParams } from "react-router-dom";

const Favorites = () => {
  const { favoriteIds } = useFavoritesContext();
  const [searchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page") || 1);
  const pageSize = 20;

  // Run one query per favoriteId
  const results = useQueries({
    queries: favoriteIds.map((id) => ({
      queryKey: ["product", id],
      queryFn: () => getProductById(id),
      enabled: !!id,
      staleTime: 1000 * 60 * 10, // 10 min cache
      refetchOnMount: false,
      refetchOnWindowFocus: false,
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
    <div className="container mx-auto my-8 px-4">
      {isLoading && (
        <p className="text-center text-gray-500">Loading favorites...</p>
      )}
      {isError && (
        <p className="text-center text-red-500">
          Could not load some favorite products.
        </p>
      )}
      {!isLoading && products.length === 0 && (
        <p className="text-center text-gray-600 py-6">
          You don’t have any favorite products yet.
        </p>
      )}

      {products.length > 0 && (
        <ProductList
          title="My Favorites ❤️"
          products={pageItems}
          total={products.length}
          pageSize={pageSize}
          mdCols={6} // dynamically sets grid to md:grid-cols-6
        />
      )}
    </div>
  );
};

export default Favorites;
