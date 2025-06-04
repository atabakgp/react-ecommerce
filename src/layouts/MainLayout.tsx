import { Outlet } from "react-router";
import { useCategories } from "@/hooks/products/useProducts";
import NavBar from "@/components/navbar/navbar";

const MainLayout = () => {
  const { data: categories } = useCategories();

  return (
    <div className="MainLayout">
      {categories && <NavBar categories={categories} />}
      <Outlet />
    </div>
  );
};

export default MainLayout;
