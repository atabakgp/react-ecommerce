import { NavLink } from "react-router-dom";
import { ICategoryItem } from "../../interfaces/categories";

interface CategoriesListProps {
  categories: ICategoryItem[];
  mode?: "normal" | "sidebar";
}

function Categories({ categories, mode = "normal" }: CategoriesListProps) {
  const renderCategoryItems = () =>
    categories.map((category: ICategoryItem) => (
      <li key={category.slug}>
        <NavLink
          to={`/category/${category.slug}`}
          className={({ isActive }) =>
            isActive
              ? "text-white font-semibold bg-blue-600 px-2 py-1 rounded"
              : "text-gray-700 hover:text-blue-600 hover:bg-gray-100 px-2 py-1 rounded"
          }
        >
          {category.name}
        </NavLink>
      </li>
    ));

  switch (mode) {
    case "sidebar":
      return (
        <div className="bg-white p-4 rounded-lg shadow-md w-64 max-h-[500px] overflow-y-auto">
          <ul className="flex flex-col gap-2">{renderCategoryItems()}</ul>
        </div>
      );

    default: // navbar
      return (
        <nav className="bg-blue-50 py-2 mb-5">
          <div className="mx-auto px-4">
            <ul className="flex flex-wrap gap-2 justify-center">
              {renderCategoryItems()}
            </ul>
          </div>
        </nav>
      );
  }
}

export default Categories;
