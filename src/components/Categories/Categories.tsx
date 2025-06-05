import { Link } from "react-router-dom";
import { ICategoryItem } from "../../interfaces/categories";
import "./Categories.scss";

interface CategoriesListProps {
  categories: ICategoryItem[];
  mode?: "slider" | "sidebar" | "dropdown"
}

function Categories({ categories, mode }: CategoriesListProps) {
  return (
    <nav className="navbar">
      <div className="container">
        <ul className="nav-links">
          {categories.map((category: ICategoryItem) => (
            <li key={category.slug}>
              <Link to={`/category/${category.slug}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Categories;
