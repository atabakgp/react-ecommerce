import { Link } from "react-router-dom";
import { ICategoryItem } from "../../interfaces/categories";
import "./NavBar.scss";

interface NavBarProps {
  categories: ICategoryItem[];
}

function NavBar({ categories }: NavBarProps) {
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

export default NavBar;
