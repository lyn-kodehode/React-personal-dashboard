import { useAppContext } from "../../context/AppContext";
import styles from "../../styles/Header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  const { theme, toggleTheme } = useAppContext();

  return (
    <header className={styles.header}>
      <h1 className={styles.dashboardHeader}>My Dashboard</h1>
      <nav>
        <div className={styles.pages}>
          <ul className={styles.pagesList}>
            <li>
              <Link to="/React-personal-dashboard/">Dashboard</Link>
            </li>
            <li>
              <Link to="/React-personal-dashboard/gutendex">Books</Link>
            </li>
            <li>
              <Link to="/React-personal-dashboard/news">News</Link>
            </li>
            <li>
              <Link to="/React-personal-dashboard/todo">Tasks</Link>
            </li>
            <li>
              <Link to="/React-personal-dashboard/about">About</Link>
            </li>
            {/* <li>
              <Link to="/dev">Dev</Link>
            </li> */}
          </ul>
        </div>
        <div className={styles.controls}>
          {" "}
          <button className={styles.themeBtn} onClick={toggleTheme}>
            <span className={styles.themeIcon}>
              {theme === "light" ? "⏾" : "☀︎"}{" "}
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
