import productAPI from "./axios";
import { IProductsResponse, IProduct } from "@/interfaces/products";
import { ICategoryItem } from "@/interfaces/categories";

export const getProducts = async (
  limit: number = 30,
  skip: number = 0
): Promise<IProductsResponse> => {
  const res = await productAPI.get("/products", {
    params: {
      limit: Number(limit),
      skip: Number(skip),
    },
  });
  return res.data;
};

export const getCategories = async (): Promise<ICategoryItem[]> => {
  const res = await productAPI.get("/products/categories");
  return res.data;
};

export const getProductsByCategory = async (
  categorySlug: string
): Promise<IProductsResponse> => {
  const res = await productAPI.get("/products/category/" + categorySlug);
  return res.data;
};
