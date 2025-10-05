import { useGetBooksByCategory } from "../../hooks/useGetBooksByCategory";

export default function GetBooksByCategoryTest() {
  //   const categories = {
  //     fiction: "Fiction",
  //     mystery: "Mystery",
  //     thriller: "Thriller",
  //     romance: "Romance",
  //     fantasy: "Fantasy",
  //     morality: "Morality",
  //     society: "Society",
  //     power: "Power",
  //     justice: "Justice",
  //     adventure: "Adventure",
  //     tragedy: "Tragedy",
  //     war: "War",
  //     philosopy: "Philosophy",
  //   };
  const { booksByCategory, loading, error, searchCategory, getCategoryItems } =
    useGetBooksByCategory();

  const handleGetCategoryItems = () => {
    getCategoryItems("society");
  };

  return (
    <div className="get-books-by-category-div">
      <button onClick={handleGetCategoryItems}>List all Society Books</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {booksByCategory.length > 0 && (
        <div>
          <h3>Found {booksByCategory.length} books:</h3>
          {booksByCategory.map((book) => (
            <li key={book.id}>{book.title}</li>
          ))}
        </div>
      )}
    </div>
  );
}
