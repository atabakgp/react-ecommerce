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
  categorySlug: string,
  limit: number = 12,
  skip: number = 0
): Promise<IProductsResponse> => {
  const res = await productAPI.get("/products/category/" + categorySlug, {
    params: {
      limit: Number(limit),
      skip: Number(skip),
    },
  });
  return res.data;
};

export const getProductById = async (
  productId: number | string
): Promise<IProduct> => {
  const res = await productAPI.get(`/products/${productId}`);
  return res.data;
};

export const searchProducts = async (
  query: string
): Promise<IProductsResponse> => {
  const res = await productAPI.get("products/search", {
    params: {
      q: query,
    },
  });
  return res.data;
};
