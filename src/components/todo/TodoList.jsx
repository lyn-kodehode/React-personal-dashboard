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
  } = useTodoContext();
  const filteredTasks = getFilteredTasks();
  //  const completedTasks = getAllCompleted();

  // Only enable delete when filter shows completed tasks
  // const shouldEnableDelete =
  //   (filterStatus === "all" || filterStatus === "completed") &&
  //   completedTasks.length > 0;

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
      <button onClick={deleteAllCompleted}>Delete Completed Tasks</button>
    </div>
  );
}

/* 
Full task management page
-Display all tasks with full CRUD operations
-Edit, delete, mark complete
-Use TodoCard component for each task
-Search and filter functionality
*/
