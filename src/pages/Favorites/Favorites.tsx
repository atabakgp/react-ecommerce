import { useQueries } from "@tanstack/react-query";
import { useFavoritesContext } from "@/context/FavoriteContext";
import { getProductById } from "@/services/productService";
import { IProduct } from "@/interfaces/products";
import ProductList from "@/components/Product/ProductList/ProductList";

const Favorites = () => {
  const { favoriteIds } = useFavoritesContext();

  // run one query per favoriteId
  const results = useQueries({
    queries: favoriteIds.map((id) => ({
      queryKey: ["product", id],
      queryFn: () => getProductById(id),
      enabled: Boolean(id),
      staleTime: Infinity, // always consider cached data fresh
      cacheTime: 1000 * 60 * 60, // keep in cache for 1 hour
      refetchOnMount: false, // don't refetch when component mounts
      refetchOnWindowFocus: false, // don't refetch when switching tabs
    })),
  });

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);

  const products: IProduct[] = results
    .map((r) => (r.isSuccess ? r.data : null))
    .filter(Boolean) as IProduct[];

  return (
    <div className="container favorites-page">
      {isLoading && <p>Loading favorites...</p>}
      {isError && <p>Could not load some favorites.</p>}
      {!isLoading && products.length === 0 && (
        <p className="py-4">No favorite products yet.</p>
      )}

      {products.length > 0 && (
        <ProductList title="My Favorites" products={products} />
      )}
    </div>
  );
};

export default Favorites;
