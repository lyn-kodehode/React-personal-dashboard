import { useTodoContext } from "../../context/TodoContext";
import styles from "../../styles/TodoSearch.module.css";

export default function TodoSearch() {
  const { searchQuery, setSearchQuery, filterStatus, setFilterStatus } =
    useTodoContext();

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className={styles.searchTasksContainer}>
      {/* <h3>Search Tasks</h3> */}

      {/* search form */}
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <select
          className={styles.filterCategory}
          value={filterStatus}
          onChange={handleFilterChange}
        >
          {/* <option value="">Search from...</option> */}
          <option value="all">All Tasks</option>
          <option value="completed">Completed Tasks</option>
          <option value="incomplete">Incomplete Tasks</option>
        </select>

        {/* sort by date/alphabetical */}
        <select name="" id=""></select>

        <input
          type="text"
          placeholder="Search tasks..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={handleSearch}
        />
        <button type="submit" className={styles.searchBtn}>
          Search
        </button>
      </form>
    </div>
  );
}
