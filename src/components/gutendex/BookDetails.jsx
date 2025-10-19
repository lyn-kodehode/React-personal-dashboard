import { useGetBookDetails } from "../../hooks/useGetBookDetails";
import { useEffect, useState } from "react";
import { useFavorites } from "../../hooks/useFavorites";
import styles from "../../styles/BookDetails.module.css";

export default function BookDetails({ bookId, onBack }) {
  const { bookDetails, loading, error, getDetails } = useGetBookDetails();
  const { toggleFavorite, isFavorited } = useFavorites();
  const [isExpanded, setIsExpanded] = useState(false);

  // Get details when component mounts or bookId changes
  useEffect(() => {
    if (bookId) {
      getDetails(bookId);
    }
  }, [bookId]);

  // const isBookFavorited = bookDetails
  //   ? favorites.some((favoriteBook) => favoriteBook.id === bookDetails.id)
  //   : false;

  return (
    <div>
      <button onClick={onBack} className={styles.backBtn}>
        ← Back to List
      </button>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
      {bookDetails && (
        <div className={styles.bookDetails}>
          <h3>{bookDetails.title}</h3>
          {bookDetails.formats && (
            <img
              className={styles.bookImage}
              src={bookDetails.formats["image/jpeg"]}
              alt={`${bookDetails.title}'s book cover`}
            />
          )}
          <div className={styles.bookInfo}>
            {bookDetails.authors && (
              <p>
                <strong>Authors:</strong>{" "}
                {bookDetails.authors.map((author) => author.name)}
              </p>
            )}
            {bookDetails.download_count && (
              <p>
                <strong>Downloads: </strong>
                {bookDetails.download_count}
              </p>
            )}
            {bookDetails.bookshelves && (
              <p>
                <strong>
                  Categor{bookDetails.bookshelves.length > 1 ? "ies: " : "y:"}
                </strong>
                {bookDetails.bookshelves
                  .map((category) => category.replace(/^Category: /, ""))
                  .join(", ")}
              </p>
            )}
            {bookDetails.languages && (
              <p>
                <strong>Language:</strong>{" "}
                {bookDetails.languages
                  .map((lang) => (lang === "en" ? "English" : "Non-English"))
                  .join(", ")}
              </p>
            )}
            {bookDetails.summaries && bookDetails.summaries.length > 0 && (
              <div className={styles.summarySection}>
                <div
                  onClick={() => setIsExpanded(!isExpanded)}
                  className={styles.summaryToggle}
                >
                  <span className={styles.expandIcon}>
                    {" "}
                    {isExpanded ? "▼" : "▶"}
                  </span>
                  <span>{isExpanded ? "Hide" : "Read"} Summary</span>
                </div>
                {isExpanded && (
                  <div className={styles.summaryContent}>
                    {bookDetails.summaries.map((summary, index) => {
                      const cleanSummary = summary
                        .replace(
                          /\(This is an automatically generated summary\.\)/gi,
                          ""
                        )
                        .trim();

                      return cleanSummary ? (
                        <p key={index} className={styles.summaryText}>
                          {cleanSummary}
                        </p>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
          {bookDetails.formats && (
            <p>
              <a
                // href={bookDetails.formats["text/plain; charset=us-ascii"]}
                href={
                  bookDetails.formats["text/html"] ||
                  bookDetails.formats["text/html; charset=utf-8"] ||
                  bookDetails.formats["text/plain; charset=us-ascii"]
                }
                target="_blank"
                rel="noopener noreferrer"
                className={styles.readOnlineLink}
              >
                {/* {bookDetails.formats["text/plain; charset=us-ascii"]} */}
                📖 Read Online
              </a>
            </p>
          )}
          {bookDetails.id && (
            <button
              onClick={() => toggleFavorite(bookDetails)}
              className={styles.favoriteBtn}
            >
              {isFavorited(bookDetails.id)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
