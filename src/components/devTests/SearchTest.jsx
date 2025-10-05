import { useSearchBooks } from "../../hooks/useSearchBooks";

export default function SearchTest() {
  const { books, loading, error, search, searchQuery } = useSearchBooks();

  const handleSearch = () => {
    search("shakespeare");
  };
  return (
    <div className="search-books-div">
      <button onClick={handleSearch}>Search Shakespeare</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {books.length > 0 && (
        <div>
          <h3>Found {books.length} books: </h3>
          {books.map((book) => (
            <div key={book.id}>
              <h4>{book.title}</h4>
              <p>
                Authors: {book.authors?.map((author) => author.name).join(", ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
