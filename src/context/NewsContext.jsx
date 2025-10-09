import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const NewsContext = createContext();

export const useNewsContext = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error("useNewsContext must be used within NewsProvider");
  }
  return context;
};

export const NewsProvider = ({ children }) => {
  const [savedArticles, setSavedArticles] = useLocalStorage(
    "savedNewsArticles",
    []
  );
  const saveArticle = (article) => {
    setSavedArticles((prevSavedArticles) => [...prevSavedArticles, article]);
  };

  const removeArticle = (articleUrl) => {
    setSavedArticles((prevSavedArticles) =>
      prevSavedArticles.filter(
        (savedArticle) => savedArticle.url !== articleUrl
      )
    );
  };

  const toggleSave = (article) => {
    const alreadySaved = savedArticles.some(
      (savedArticle) => savedArticle.url === article.url
    );
    if (alreadySaved) {
      removeArticle(article.url);
    } else {
      saveArticle(article);
    }
  };

  const isArticleSaved = (articleUrl) => {
    return savedArticles.some(
      (savedArticle) => savedArticle.url === articleUrl
    );
  };

  const value = {
    savedArticles,
    saveArticle,
    removeArticle,
    isArticleSaved,
    toggleSave,
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};
