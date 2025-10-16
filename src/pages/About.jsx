import styles from "../styles/About.module.css";

export default function About() {
  return (
    <div className={styles.aboutContainer}>
      <h1>About</h1>

      <div className={styles.aboutContent}>
        <p>
          A personal dashboard for managing your daily information and tasks.
        </p>

        <h2>Features</h2>
        <ul>
          <li>
            <span className={styles.featureName}>Books</span> - Search and save
            your favorite books using Gutendex API
          </li>
          <li>
            <span className={styles.featureName}>News</span> - Browse and save
            news articles using NewsAPI
          </li>
          <li>
            <span className={styles.featureName}>Tasks</span> - Manage your
            tasks
          </li>
          <li>
            <span className={styles.featureName}>Weather</span> - Track weather
            for your cities using Open Meteo Weather API
          </li>
        </ul>

        <p>
          Built with React and designed to be your personal information hub.
        </p>
      </div>
    </div>
  );
}
