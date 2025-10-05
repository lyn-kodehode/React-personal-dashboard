import { useGetBookDetails } from "../../hooks/useGetBookDetails";

export default function GetBookDetailsTest() {
  const { bookDetails, loading, error, bookId, getDetails } =
    useGetBookDetails();

  const handleGetInfo = () => {
    getDetails("1661");
  };

  return (
    <div className="get-boook-details-div">
      <button onClick={handleGetInfo}>Get Book Info for Romeo & Juliet</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {bookDetails && (
        <div>
          <h3>{bookDetails.title}</h3>
          {bookDetails.formats && (
            <img src={bookDetails.formats["image/jpeg"]} alt="" />
          )}
          {bookDetails.authors && (
            <p>By: {bookDetails.authors.map((author) => author.name)}</p>
          )}
          {bookDetails.download_count && (
            <p>Number of downloads: {bookDetails.download_count}</p>
          )}
          {bookDetails.bookshelves && (
            <p>
              Categor{bookDetails.bookshelves.length > 1 ? "ies: " : "y:"}
              {bookDetails.bookshelves.map((category) => category).join(", ")}
            </p>
          )}
          {bookDetails.languages && (
            <p>
              Language:{" "}
              {bookDetails.languages
                .map((lang) => (lang === "en" ? "English" : "Non-English"))
                .join(", ")}
            </p>
          )}
          {bookDetails.formats && (
            <p>
              <a
                href={bookDetails.formats["text/plain; charset=us-ascii"]}
                target="_blank"
              >
                {bookDetails.formats["text/plain; charset=us-ascii"]}
              </a>
            </p>
          )}
          {bookDetails.id && <button>Add to Favorites</button>}
        </div>
      )}
    </div>
  );
}

/* Coverbilde
Forfatter
Antall nedlastninger
Kategori
Språk
Lenke til boka i digitalt format
En knapp for "Legg til i Favoritter" */
