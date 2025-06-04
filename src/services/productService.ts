// src/services/productService.ts
import productAPI from "./axios/axios";
import { IProductsResponse } from "../interfaces/products";

export const getProducts = async (limit: number = 30, skip: number = 0): Promise<IProductsResponse> => {
  const res = await productAPI.get("/products", {
    params: {
      limit: Number(limit),
      skip: Number(skip)
    }
  });
  return res.data;
};