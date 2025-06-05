import { useQuery } from "@tanstack/react-query";
import {
  getProducts,
  getCategories,
  getProductsByCategory,
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
