import styles from "../../styles/TodoCard.module.css";
import { formatCreatedAt, formatLastUpdated } from "../../utils/dateFormatter";

export default function TodoCard({ task, onEdit, onDelete, onToggle }) {
  const { id, text, completed, dateCreated, lastEdited } = task;

  const handleToggleChange = () => {
    onToggle(id);
  };

  const handleEdit = () => {
    const newText = window.prompt("Edit task:", text);
    if (newText && newText.trim() !== text) {
      onEdit(id, newText);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(id);
    }
  };
  return (
    <div className={styles.todoCardContainer}>
      <input
        type="checkbox"
        checked={completed}
        onChange={handleToggleChange}
        className={styles.taskCheckbox}
      />
      <div className={styles.taskContent}>
        <h3
          className={`${styles.taskText} ${completed ? styles.completed : ""}`}
        >
          {text}
        </h3>
        <div className={styles.taskDates}>
          {" "}
          <p className={styles.dateInfo}>
            <span className={styles.dateLabel}>Created on:</span>{" "}
            <span className={styles.dateValue}>
              {formatCreatedAt(dateCreated)}
              {/* {dateCreated} */}
            </span>
          </p>
          <p className={styles.dateInfo}>
            <span className={styles.dateLabel}>Last edited on:</span>{" "}
            <span className={styles.dateValue}>
              {formatLastUpdated(lastEdited)}
              {/* {lastEdited} */}
            </span>
          </p>
        </div>
      </div>

      <div className={styles.controls}>
        <button onClick={handleEdit} className={styles.editBtn}>
          Edit
        </button>
        <button onClick={handleDelete} className={styles.deleteBtn}>
          Delete
        </button>
      </div>
    </div>
  );
}
