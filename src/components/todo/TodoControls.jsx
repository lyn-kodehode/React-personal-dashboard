import styles from "../../styles/TodoControls.module.css";

export default function TodoControls() {
  return (
    <>
      <input
        type="text"
        placeholder="Search tasks..."
        className={styles.searchInput}
      />
      <button>Create New Task</button>
      <label>
        <input type="checkbox" />
        Show Completed Tasks
      </label>
    </>
  );
}
