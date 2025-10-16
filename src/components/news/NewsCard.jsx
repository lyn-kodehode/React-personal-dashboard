import { useNewsContext } from "../../context/NewsContext";
import styles from "../../styles/NewsCard.module.css";
import { useState } from "react";

export default function NewsCard({ article }) {
  const { isArticleSaved, toggleSave } = useNewsContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const { title, url, description, content, source, publishedAt, urlToImage } =
    article;

  const stripHTML = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "");
  };

  const cleanContent = (content) => {
    if (!content) return "";
    let cleaned = stripHTML(content);
    cleaned = cleaned.replace(/\[\+\d+\s+chars\]/g, "");
    return cleaned.trim();
  };

  return (
    <article className={styles.newsCardContainer}>
      <header>
        <h3>{title}</h3>
      </header>
      <div className={styles.imageContainer}>
        <img className={styles.newsImage} src={urlToImage} alt="" />
      </div>
      <div className={styles.newsInfo}>
        {/* <a className={styles.newsLink} href={url} target="_blank"></a> */}
        <p>
          {!isExpanded ? (
            <span className={`${styles.newsText} ${styles.collapsed}`}>
              {description}
            </span>
          ) : (
            <span className={`${styles.newsText} ${styles.expanded}`}>
              {cleanContent(content)}{" "}
              <a href={url} target="_blank" rel="noopener noreferrer">
                Read full article{" "}
              </a>
            </span>
          )}
          <button
            className={styles.expandBtn}
            onClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
          >
            {isExpanded ? "[...collapse]" : "[...expand]"}
          </button>
          <button
            onClick={() => toggleSave(article)}
            // className={styles.saveBtn}
            className={isArticleSaved(url) ? styles.removeBtn : styles.saveBtn}
          >
            {isArticleSaved(url) ? "Remove article" : "Add article"}
          </button>
        </p>
      </div>
    </article>
  );
}

/* {
  <p>
    <span className={`${styles.newsText} ${styles.collapsed}`}>
      {description}
    </span>{" "}
    <span className={`${styles.newsText} ${styles.expanded}`}>{content}</span>
    <button
      className={styles.expandBtn}
      onClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
    >
      {isExpanded ? "[...collapse]" : "[...expand]"}
    </button>
  </p>;
} */
