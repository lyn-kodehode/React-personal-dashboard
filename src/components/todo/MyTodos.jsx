import { Link } from "react-router-dom";
import { useTodoContext } from "../../context/TodoContext";
import styles from "../../styles/MyTodos.module.css";
import TodoList from "./TodoList";

export default function MyTodos() {
  const { allTasks } = useTodoContext();
  return (
    <div className={styles.myTasksContainer}>
      <div className={styles.taskList}>
        <TodoList />
      </div>
      <Link to="/todo" className={styles.addTaskLink}>
        Add New Task
      </Link>
    </div>
  );
}
