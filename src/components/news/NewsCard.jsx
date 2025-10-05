import styles from "../../styles/NewsCard.module.css";
import { useState } from "react";

export default function NewsCard({
  title,
  url,
  description,
  content,
  source,
  publishedAt,
  imageUrl,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className={styles.newsCardContainer}>
      <header>
        <h3>{title}</h3>
      </header>
      <div className={styles.imageContainer}>
        <img className={styles.newsImage} src={imageUrl} alt="" />
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
              {content}
            </span>
          )}
          <button
            className={styles.expandBtn}
            onClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
          >
            {isExpanded ? "[...collapse]" : "[...expand]"}
          </button>
        </p>
        {/* <p>{content}</p> */}
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
