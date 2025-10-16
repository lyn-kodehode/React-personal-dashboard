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
      {filteredTasks.map((task) => (
        <TodoCard
          key={task.id}
          task={task}
          onToggle={toggleComplete}
          onEdit={editTask}
          onDelete={deleteTask}
        />
      ))}
      <button
        onClick={handleDeleteAll}
        disabled={!shouldEnableDeleteAllCompleted}
      >
        Delete ALL Completed Tasks
      </button>
    </div>
  );
}
