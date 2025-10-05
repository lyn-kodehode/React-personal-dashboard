import { useState } from "react";
import { getBookDetails } from "../utils/gutendexAPI";

export const useGetBookDetails = () => {
  const [bookDetails, setBookDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookId, setBookId] = useState("");

  const getDetails = async (id) => {
    setLoading(true);
    setError(null);
    setBookId(id);
    // clear prev book details
    setBookDetails({});
    try {
      const results = await getBookDetails(id);
      setBookDetails(results);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { bookDetails, loading, error, bookId, getDetails };
};
