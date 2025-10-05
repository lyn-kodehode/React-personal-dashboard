import { searchBooks } from "../utils/gutendexAPI";
import { useState } from "react";

export const useSearchBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const search = async (query, page = 1) => {
    setLoading(true);
    setError(null);
    setSearchQuery(query);
    setCurrentPage(page);
    setBooks([]);
    try {
      const data = await searchBooks(query, page);
      setBooks(data.results);
      setTotalCount(data.count);
      setHasNext(!!data.next);
      setHasPrevious(!!data.previous);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const nextPage = () => {
    if (hasNext) {
      search(searchQuery, currentPage + 1);
    }
  };

  const previousPage = () => {
    if (hasPrevious) {
      search(searchQuery, currentPage - 1);
    }
  };

  return {
    books,
    loading,
    error,
    search,
    currentPage,
    totalCount,
    hasNext,
    hasPrevious,
    nextPage,
    previousPage,
  };
};
