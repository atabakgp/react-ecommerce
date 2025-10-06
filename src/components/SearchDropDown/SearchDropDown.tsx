import "./SearchDropDown.scss";
import { IProduct } from "@/interfaces/products";
import { Link } from "react-router-dom";

interface SearchDropdownProps {
  products: IProduct[];
  onSelect?: () => void;
}

function SearchDropdown({ products, onSelect }: SearchDropdownProps) {
  const slugGenerator = (text: string): string => {
    return text.toLowerCase().replace(/\s+/g, "-");
  };

  const urlGenerator = (product: IProduct): string => {
    const titleSlug = product.title ? `/${slugGenerator(product.title)}` : "";
    const brandSlug = product.brand ? `/${slugGenerator(product.brand)}` : "";
    return `${brandSlug}${titleSlug}/${product.id}`;
  };

  return (
    <ul className="dropdown-menu show w-100" style={{ position: "absolute" }}>
      {products && products.length > 0 ? (
        products.map((product: IProduct) => (
          <li key={product.id}>
            <Link
              className="dropdown-item"
              to={urlGenerator(product)}
              onClick={onSelect}
            >
              {product.title}
            </Link>
          </li>
        ))
      ) : (
        <li className="dropdown-item disabled">No results found</li>
      )}
    </ul>
  );
}

export default SearchDropdown;
