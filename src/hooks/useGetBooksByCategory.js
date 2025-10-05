import { getBooksByCategory } from "../utils/gutendexAPI";
import { useState } from "react";

export const useGetBooksByCategory = () => {
  const [booksByCategory, setBooksByCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchCategory, setSearchCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const getCategoryItems = async (categoryItem, page = 1) => {
    setLoading(true);
    setError(null);
    setSearchCategory(categoryItem);
    setCurrentPage(page);
    setBooksByCategory([]);
    try {
      const data = await getBooksByCategory(categoryItem, page);
      setBooksByCategory(data.results);
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
      getCategoryItems(searchCategory, currentPage + 1);
    }
  };

  const previousPage = () => {
    if (hasPrevious) {
      getCategoryItems(searchCategory, currentPage - 1);
    }
  };

  return {
    booksByCategory,
    loading,
    error,
    searchCategory,
    getCategoryItems,
    currentPage,
    totalCount,
    hasNext,
    hasPrevious,
    nextPage,
    previousPage,
  };
};
