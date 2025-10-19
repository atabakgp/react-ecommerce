import React from "react";
import { useSearchParams } from "react-router-dom";

interface PaginationProps {
  currentPage?: number; // if not provided, will read from URL (?page)
  totalPages: number;
  onPageChange?: (page: number) => void; // optional: extra side-effects
}

const MAX_VISIBLE_PAGES = 5;

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
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
    <nav aria-label="Product pagination" className="flex justify-center my-6">
      <ul className="flex gap-2">
        {/* Previous button */}
        <li>
          <button
            onClick={handlePrev}
            disabled={activePage === 1}
            className={`px-3 py-1 rounded ${
              activePage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
        </li>

        {/* Page numbers */}
        {pages.map((p, idx) =>
          p === "..." ? (
            <li key={`ellipsis-${idx}`}>
              <span className="px-3 py-1 text-gray-500 select-none">…</span>
            </li>
          ) : (
            <li key={`${p}-${idx}`}>
              <button
                onClick={() => updateUrlPage(p as number)}
                className={`px-3 py-1 rounded ${
                  p === activePage
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {p}
              </button>
            </li>
          )
        )}

        {/* Next button */}
        <li>
          <button
            onClick={handleNext}
            disabled={activePage === totalPages}
            className={`px-3 py-1 rounded ${
              activePage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
