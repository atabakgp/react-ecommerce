import { Link, NavLink } from "react-router-dom";
import { ICategoryItem } from "../../interfaces/categories";
import "./Categories.scss";

interface CategoriesListProps {
  categories: ICategoryItem[];
  mode?: "normal" | "sidebar" | "dropdown";
}

function Categories({ categories, mode }: CategoriesListProps) {
  const renderCategoryItems = () => (
    <>
      {categories.map((category: ICategoryItem, index) => (
        <li key={category.slug}>
          <NavLink
            to={`/category/${category.slug}`}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {category.name}
          </NavLink>
        </li>
      ))}
    </>
  );

  if (mode === "sidebar") {
    return (
      <div className="categories-list sidebar-categories">
        <ul className="sidebar-category-list">{renderCategoryItems()}</ul>
      </div>
    );
  }
  if (mode === "dropdown") {
    return (
      <div className="categories-list dropdown-categories">
        <ul className="dropdown-category-list">{renderCategoryItems()}</ul>
      </div>
    );
  }

  return (
    <nav className="categories-list navbar-category-list">
      <div className="container">
        <ul className="nav-links">{renderCategoryItems()}</ul>
      </div>
    </nav>
  );
}

export default Categories;
