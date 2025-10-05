import { useState } from "react";

export const useShowResults = () => {
  const [selectedBookId, setSelectedBookId] = useState(null);

  const handleBookClick = (bookId) => {
    setSelectedBookId(bookId);
  };

  const handleBackToResults = () => {
    setSelectedBookId(null);
  };

  return { selectedBookId, handleBookClick, handleBackToResults };
};
