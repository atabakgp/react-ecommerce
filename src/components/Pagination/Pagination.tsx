import React from "react";
import { useSearchParams } from "react-router-dom";

interface PaginationProps {
  currentPage?: number; // if not provided, will read from URL (?page)
  totalPages: number;
  onPageChange?: (page: number) => void; // optional: extra side-effects
}

const MAX_VISIBLE_PAGES = 5;

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlPage = Number(searchParams.get("page") || 1);
  const activePage = currentPage ?? urlPage;

  if (totalPages <= 1) return null;

  const createPageArray = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    const visible = Math.min(MAX_VISIBLE_PAGES, totalPages);
    const half = Math.floor(visible / 2);

    let start = Math.max(1, activePage - half);
    let end = Math.min(totalPages, start + visible - 1);

    // Adjust start if we are at the end
    start = Math.max(1, end - visible + 1);

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push("...");
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = createPageArray();

  const updateUrlPage = (nextPage: number) => {
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("page", String(nextPage));
      return p;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    onPageChange && onPageChange(nextPage);
  };

  const handlePrev = () => updateUrlPage(Math.max(1, activePage - 1));
  const handleNext = () => updateUrlPage(Math.min(totalPages, activePage + 1));

  return (
    <nav aria-label="Product pagination">
      <ul className="pagination justify-content-center my-4">
        <li className={`page-item ${activePage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={handlePrev} aria-label="Previous">
            Previous
          </button>
        </li>
        {pages.map((p, idx) => (
          <li
            key={`${p}-${idx}`}
            className={`page-item ${p === activePage ? "active" : ""} ${p === "..." ? "disabled" : ""}`}
          >
            {p === "..." ? (
              <span className="page-link">…</span>
            ) : (
              <button className="page-link" onClick={() => updateUrlPage(p as number)}>
                {p}
              </button>
            )}
          </li>
        ))}
        <li className={`page-item ${activePage === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={handleNext} aria-label="Next">
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;


