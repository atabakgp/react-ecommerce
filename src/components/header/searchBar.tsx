import { useState, useRef, useEffect } from "react";
import { useSearchProducts } from "@/hooks/products/useProducts";
import SearchDropdown from "@/components/searchDropdown/SearchDropdown";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: searchProducts } = useSearchProducts(debouncedQuery);
  const searchRef = useRef<HTMLDivElement>(null);
  const products = searchProducts?.products || [];

  // debounce search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(handler);
  }, [query]);

  // close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="search-bar position-relative" ref={searchRef}>
      <input
        type="text"
        className="form-control"
        placeholder="Search products..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowDropdown(e.target.value.length > 0);
        }}
        onFocus={() => query && setShowDropdown(true)}
      />

      {showDropdown && products.length > 0 && (
        <SearchDropdown
          products={products}
          onSelect={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;
