import TodoCard from "./TodoCard";
import { useTodoContext } from "../../context/TodoContext";
import styles from "../../styles/TodoList.module.css";

export default function TodoList() {
  const {
    getFilteredTasks,
    deleteAllCompleted,
    toggleComplete,
    editTask,
    deleteTask,
    getAllCompleted,
    filterStatus,
    sortTasks,
  } = useTodoContext();
  const filteredTasks = sortTasks(getFilteredTasks());
  const completedTasks = getAllCompleted();

  // Only enable delete when filter shows completed tasks
  const shouldEnableDeleteAllCompleted =
    // filterStatus === "all" ||
    filterStatus === "completed" && completedTasks.length > 0;

  const handleDeleteAll = () => {
    if (
      window.confirm("Are you sure you want to delete ALL completed tasks?")
    ) {
      deleteAllCompleted();
    }
  };

  return (
    <div className={styles.todoListContainer}>
      {/* No tasks message */}
      {filteredTasks.length === 0 ? (
        <p className={styles.emptyMessage}>No tasks created yet.</p>
      ) : (
        <div className={styles.results}>
          <div className={styles.resultsHeader}>
            {" "}
            <h4>
              You have {filteredTasks.length} saved task
              {filteredTasks.length === 1 ? "" : "s"}
            </h4>
          </div>

          <div className={styles.taskList}>
            {filteredTasks.map((task) => (
              <TodoCard
                key={task.id}
                task={task}
                onToggle={toggleComplete}
                onEdit={editTask}
                onDelete={deleteTask}
                className={styles.taskItem}
              />
            ))}
            {/* <div className={styles.deleteSection}>
              <button
                onClick={handleDeleteAll}
                disabled={!shouldEnableDeleteAllCompleted}
                className={styles.deleteAllBtn}
              >
                Delete ALL Completed Tasks
              </button>
            </div> */}
          </div>
          <div className={styles.deleteSection}>
            <button
              onClick={handleDeleteAll}
              disabled={!shouldEnableDeleteAllCompleted}
              className={styles.deleteAllBtn}
            >
              Delete ALL Completed Tasks
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
