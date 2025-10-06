import { useQuery } from "@tanstack/react-query";
import {
  getProducts,
  getCategories,
  getProductsByCategory,
  getProductById,
  searchProducts,
} from "@/services/productService";

export const useProducts = (limit?: number, skip?: number) => {
  return useQuery({
    queryKey: ["products", limit, skip],
    queryFn: () => getProducts(limit, skip),
    select: (data) => {
      return {
        ...data,
        products: data.products.map((p) => ({
          ...p,
          isFavorited: false,
        })),
      };
    },
  });
};

export const useFetchCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5,
  });
};

export const useFetchProductsByCategory = (categorySlug: string) => {
  return useQuery({
    queryKey: ["productsByCategory", categorySlug],
    queryFn: () => getProductsByCategory(categorySlug),
    staleTime: 1000 * 60 * 5,
  });
};

export const useFetchProductById = (productId?: number | string) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId as number | string),
    enabled: Boolean(productId),
  });
};

export const useSearchProducts = (query: string) => {
  return useQuery({
    queryKey: ["query", query],
    queryFn: () => searchProducts(query),
    enabled: query.length > 0,
  });
};
