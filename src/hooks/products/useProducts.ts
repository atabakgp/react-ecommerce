import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/productService";

export const useProducts = (limit?: number, skip?: number) => {
  return useQuery({
    queryKey: ["products", limit, skip],
    queryFn: ()=> getProducts(limit, skip),
  });
};
