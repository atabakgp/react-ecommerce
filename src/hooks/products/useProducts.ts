import { useQuery } from "@tanstack/react-query";
import {
  getProducts,
  getCategories,
  getProductsByCategory,
  getProductById,
} from "@/services/productService";

export const useProducts = (limit?: number, skip?: number) => {
  return useQuery({
    queryKey: ["products", limit, skip],
    queryFn: () => getProducts(limit, skip),
  });
};

export const useFetchCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};

export const useFetchProductsByCategory = (categorySlug: string) => {
  return useQuery({
    queryKey: ["productsByCategory", categorySlug],
    queryFn: () => getProductsByCategory(categorySlug),
  });
};

export const useFetchProductById = (productId?: number | string) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId as number | string),
    enabled: Boolean(productId),
  });
};
