import { useLocalStorage } from "./useLocalStorage";

export const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage("favoriteBooks", []);

  // favorites function
  const addToFavorites = (book) => {
    const alreadyFavorited = favorites.some(
      (favoriteBook) => favoriteBook.id === book.id
    );
    if (!alreadyFavorited) {
      setFavorites([...favorites, book]);
    }
  };

  const removeFromFavorites = (bookId) => {
    setFavorites(
      favorites.filter((favoriteBook) => favoriteBook.id !== bookId)
    );
  };

  const toggleFavorite = (book) => {
    const alreadyFavorited = favorites.some(
      (favoriteBook) => favoriteBook.id === book.id
    );
    if (alreadyFavorited) {
      removeFromFavorites(book.id);
    } else {
      addToFavorites(book);
    }
  };

  const isFavorited = (bookId) => {
    return favorites.some((book) => book.id === bookId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorited,
  };
};
