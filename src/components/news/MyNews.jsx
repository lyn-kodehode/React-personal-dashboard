import { useNewsContext } from "../../context/NewsContext";
import styles from "../../styles/MyNews.module.css";
import NewsCard from "./NewsCard";
import { Link } from "react-router-dom";

export default function MyNews() {
  const { savedArticles } = useNewsContext();

  return (
    <div className={styles.myNewsContainer}>
      {/* <h3>My News</h3> */}

      {/* savedArticles not empty */}
      {savedArticles.length > 0 && (
        <div className={styles.newsList}>
          {savedArticles.map((article) => (
            <NewsCard key={article.url} article={article} />
          ))}
        </div>
      )}

      {/* No savedarticles */}
      {savedArticles.length === 0 && (
        <div className={styles.noResults}>No saved articles yet.</div>
      )}

      <Link to="/news" className={styles.addMoreLink}>
        Save More Articles
      </Link>
    </div>
  );
}
