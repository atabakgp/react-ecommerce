import { IProduct } from "@/interfaces/products";
import { Link } from "react-router-dom";

interface SearchDropdownProps {
  products: IProduct[];
  onSelect?: () => void;
}

function SearchDropdown({ products, onSelect }: SearchDropdownProps) {
  const slugGenerator = (text: string) =>
    text.toLowerCase().replace(/\s+/g, "-");

  const urlGenerator = (product: IProduct) => {
    const titleSlug = product.title ? `/${slugGenerator(product.title)}` : "";
    const brandSlug = product.brand ? `/${slugGenerator(product.brand)}` : "";
    return `${brandSlug}${titleSlug}/${product.id}`;
  };

  return (
    <ul className="absolute w-full bg-white shadow-md rounded-md overflow-hidden z-50">
      {products && products.length > 0 ? (
        products.map((product: IProduct) => (
          <li key={product.id}>
            <Link
              to={urlGenerator(product)}
              onClick={onSelect}
              className="block px-4 py-2 text-gray-700 hover:bg-blue-100 transition-colors"
            >
              {product.title}
            </Link>
          </li>
        ))
      ) : (
        <li className="px-4 py-2 text-gray-400 cursor-not-allowed">
          No results found
        </li>
      )}
    </ul>
  );
}

export default SearchDropdown;
