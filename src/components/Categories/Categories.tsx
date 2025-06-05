import { Link } from "react-router-dom";
import { ICategoryItem } from "../../interfaces/categories";
import "./Categories.scss";

interface CategoriesListProps {
  categories: ICategoryItem[];
  mode?: "normal" | "sidebar" | "dropdown";
}

function Categories({ categories, mode }: CategoriesListProps) {

  const renderCategoryItems = () => (
    <>
      {categories.map((category: ICategoryItem) => (
        <li key={category.slug}>
          <Link to={`/category/${category.slug}`}>{category.name}</Link>
        </li>
      ))}
    </>
  );

  if (mode === "sidebar") {
    return (
      <div className="categories-list sidebar-categories">
        <ul className="sidebar-category-list">
          {renderCategoryItems()}
        </ul>
      </div>
    );
  }
  if (mode === "dropdown") {
    return (
      <div className="categories-list dropdown-categories">
        <ul className="dropdown-category-list">
          {renderCategoryItems()}
        </ul>
      </div>
    );
  } 

  return (
    <nav className="categories-list navbar-category-list">
      <div className="container">
        <ul className="nav-links">
          {renderCategoryItems()}
        </ul>
      </div>
    </nav>
  );
}

export default Categories;
