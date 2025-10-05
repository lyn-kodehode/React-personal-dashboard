import styles from "../../styles/News.module.css";
import { Link, Outlet } from "react-router-dom";

export default function News() {
  return (
    <section className={styles.newsPage}>
      <header className={styles.widgetHeader}>
        <h2>News & Articles</h2>
      </header>
      <nav className={styles.newsNav}>
        <Link to=".">Search</Link>
        <Link to="categories">Categories</Link>
        <Link to="mynews">My News</Link>
      </nav>
      <div className={styles.widgetContent}>
        <Outlet />
      </div>
    </section>
  );
}

{
  /* <NewsCard
            key={index}
            title={article.title}
            url={article.url}
            description={article.description}
            content={article.content}
            source={article.source.name}
            publishedAt={article.publishedAt}
            imageUrl={article.urlToImage}
          /> */
}
