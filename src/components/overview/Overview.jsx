import { useOverviewContext } from "../../context/OverviewContext";
import styles from "../../styles/Overview.module.css";

export default function Overview() {
  const { overviewStats } = useOverviewContext();

  return (
    <div className={styles.overviewContainer}>
      {/* <h3>Dashboard Summary</h3> */}
      <div className={styles.overviewGrid}>
        <div className={styles.overviewCard}>
          <h4>Books</h4>
          <p>Favorites: {overviewStats.books.total}</p>
        </div>

        <div className={styles.overviewCard}>
          <h4>News</h4>
          <p>Saved: {overviewStats.news.total}</p>
        </div>

        <div className={styles.overviewCard}>
          <h4>Todos</h4>
          <p>Total: {overviewStats.todos.total}</p>
          <p>Completed: {overviewStats.todos.completed}</p>
          <p>Pending: {overviewStats.todos.incomplete}</p>
        </div>

        <div className={styles.overviewCard}>
          <h4>Weather</h4>
          <p>Cities: {overviewStats.weather.cities}</p>
        </div>
      </div>
    </div>
  );
}
