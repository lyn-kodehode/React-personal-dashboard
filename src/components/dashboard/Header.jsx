import { useAppContext } from "../../context/AppContext";
import styles from "../../styles/Header.module.css";
import { Link } from "react-router-dom";

export default function Header() {
  const { theme, toggleTheme } = useAppContext();

  return (
    <header className={styles.header}>
      <h1>My Dashboard</h1>
      <nav>
        <div className={styles.pages}>
          <ul className={styles.pagesList}>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/gutendex">Books</Link>
            </li>
            <li>
              <Link to="/news">News</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/dev">Dev</Link>
            </li>
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
