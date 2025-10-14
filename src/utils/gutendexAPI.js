export const gutendex_base_url = "https://gutendex.com/books";

export const searchBooks = async (query) => {
  const searchEndpoint = `${gutendex_base_url}?search=${query}`;

  try {
    const response = await fetch(searchEndpoint);
    if (!response.ok) {
      throw new Error(
        `HTTP error: ${response.status} status: ${response.statusText}`
      );
    }
    const data = await response.json();
    return {
      results: data.results,
      count: data.count,
      next: data.next,
      previous: data.previous,
    };
  } catch (error) {
    // for debugging - developers
    console.error(`Error fetching books`, error);
    // for UI - users
    throw new Error("Failed to search books");
  }
};

export const getBookDetails = async (id) => {
  const bookDetailEndpoint = `${gutendex_base_url}/${id}`;

  try {
    const response = await fetch(bookDetailEndpoint);
    if (!response.ok) {
      throw new Error(
        `HTTP error: ${response.status}, status: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching book info", error);
    throw new Error(`Failed to show info for book ${id}`);
  }
};

export const getBooksByCategory = async (category, page = 1) => {
  const categoryEndpoint = `${gutendex_base_url}?topic=${category}&page=${page}`;

  try {
    const response = await fetch(categoryEndpoint);
    if (!response.ok) {
      throw new Error(
        `HTTP error: ${response.status}, status: ${response.statusText}`
      );
    }
    const data = await response.json();
    return {
      results: data.results,
      count: data.count,
      next: data.next,
      previous: data.previous,
    };
  } catch (error) {
    console.error("Error fetching category", error);
    throw new Error(`Failed to show books in category ${category}`);
  }
};
