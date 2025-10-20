import styles from "../styles/About.module.css";

export default function About() {
  return (
    <div className={styles.aboutContainer}>
      <h1>About</h1>

      <div className={styles.aboutContent}>
        <p>
          A responsive personal dashboard built with React featuring real-time
          weather, news, book search, and task management.
        </p>

        <h2>Features</h2>
        <ul>
          <li>
            <span className={styles.featureName}>Clock</span> - Analog clock
            with current date display
          </li>
          <li>
            <span className={styles.featureName}>Overview</span> - Quick stats
            summary of all your saved items
          </li>
          <li>
            <span className={styles.featureName}>Books</span> - Search, save,
            and read favorite books online from{" "}
            <a
              href="https://gutendex.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.aboutApiLink}
            >
              Project Gutenberg
            </a>
          </li>
          <li>
            <span className={styles.featureName}>News</span> - Browse and save
            articles by category or search (powered by{" "}
            <a
              href="https://newsapi.org/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.aboutApiLink}
            >
              NewsAPI
            </a>
            )
          </li>
          <li>
            <span className={styles.featureName}>Tasks</span> - Create, filter,
            and manage tasks with local persistence
          </li>
          <li>
            <span className={styles.featureName}>Weather</span> - Track multiple
            cities with auto-refresh and real-time updates using{" "}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.aboutApiLink}
            >
              Open Meteo Weather API
            </a>
          </li>
          <li>
            <span className={styles.featureName}>Dark/Light Theme</span> -
            Toggle between themes with persistent preference
          </li>
        </ul>

        <p>
          Built with React and designed to be your personal information hub.
        </p>
      </div>
    </div>
  );
}
