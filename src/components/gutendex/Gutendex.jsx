import styles from "../../styles/Gutendex.module.css";
import { Link, Outlet } from "react-router-dom";

export default function Gutendex() {
  return (
    <section className={styles.gutendexPage}>
      {/* navigation within widget */}
      <header className={styles.widgetHeader}>
        {" "}
        <h2>Books & Literature</h2>
      </header>
      <nav className={styles.gutendexNav}>
        {/* using relative instead of absolute paths */}
        <Link to=".">Search</Link>
        <Link to="categories">Categories</Link>
        <Link to="favorites">Favorites</Link>
      </nav>
      <div className={styles.widgetContent}>
        <Outlet />
      </div>

      {/* Internal routes within the widget */}
    </section>
  );
}
