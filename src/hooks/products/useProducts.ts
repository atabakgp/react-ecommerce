import { useQuery } from "@tanstack/react-query";
import { getProducts, getCategories } from "../../services/productService";

export const useProducts = (limit?: number, skip?: number) => {
  return useQuery({
    queryKey: ["products", limit, skip],
    queryFn: ()=> getProducts(limit, skip),
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
