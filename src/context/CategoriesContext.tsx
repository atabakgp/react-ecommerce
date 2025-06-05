// src/context/LoadingContext.tsx
import React, { createContext, useContext, useState } from "react";
import { ICategoryItem } from "@/interfaces/categories";

type CategoriesContextType = {
  categories: ICategoryItem[];
  setCategories: (categories: ICategoryItem[]) => void;
};

const CategoriesContext = createContext<CategoriesContextType | undefined>(
  undefined
);

export const CategoriesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [categories, setCategories] = useState<ICategoryItem[]>([]);
  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
};
