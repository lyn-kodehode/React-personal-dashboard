import styles from "../../styles/Todo.module.css";
import TodoCreate from "./TodoCreate";
import TodoSearch from "./TodoSearch";
import TodoList from "./TodoList";
import { TodoProvider } from "../../context/TodoContext";

export default function Todo() {
  return (
    <TodoProvider>
      <section className={styles.todoPage}>
        <header className={styles.widgetHeader}>
          <h2>Task Manager</h2>
        </header>
        <TodoSearch />
        <TodoCreate />
        <TodoList />
      </section>
    </TodoProvider>
  );
}

/* 
- Search input
- Filter dropdown (All/Completed/Incomplete)
- Add task input + button
- "Delete All Completed" button
- Results list with TodoCard components
- All CRUD operations
*/
