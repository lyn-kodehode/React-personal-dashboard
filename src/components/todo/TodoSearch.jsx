import { useTodoContext } from "../../context/TodoContext";
import styles from "../../styles/TodoSearch.module.css";

export default function TodoSearch() {
  const {
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    sortBy,
    setSortBy,
  } = useTodoContext();

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div className={styles.searchTasksContainer}>
      {/* <h3>Search Tasks</h3> */}

      {/* search form */}

      <select
        className={styles.filterCategory}
        value={filterStatus}
        onChange={handleFilterChange}
        // onKeyDown={(event) => {
        //   if (event.key === "Enter") {
        //     handleSearch();
        //   }
        // }}
      >
        {/* <option value="">Search from...</option> */}
        <option value="all">All Tasks</option>
        <option value="completed">Completed Tasks</option>
        <option value="incomplete">Incomplete Tasks</option>
      </select>

      {/* sort by date/alphabetical */}
      <select
        className={styles.sortCategory}
        value={sortBy}
        onChange={handleSortChange}
      >
        <option value="date-descending">Newest to Oldest</option>
        <option value="date-ascending">Oldest to Newest</option>
        <option value="alphabetical-descending">A to Z </option>
        <option value="alphabetical-ascending">Z to A</option>
      </select>

      <input
        type="search"
        placeholder="Search tasks..."
        className={styles.searchInput}
        value={searchQuery}
        onChange={handleSearch}
      />
    </div>
  );
}
