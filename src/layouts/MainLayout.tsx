import { useEffect } from "react";
import { Outlet } from "react-router";
import { useLoaderData } from "react-router-dom";
import { useCategories } from "@/context/CategoriesContext";
import { ICategoryItem } from "@/interfaces/categories";

const MainLayout = () => {
  const { setCategories } = useCategories();
  const categories = useLoaderData() as ICategoryItem[];

  useEffect(() => {
    if (categories) {
      setCategories(categories);
    }
  }, [categories, setCategories]);

  return (
    <div className="MainLayout">
      <Outlet />
    </div>
  );
};

export default MainLayout;
