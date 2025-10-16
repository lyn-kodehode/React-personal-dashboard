import { useTodoContext } from "../../context/TodoContext";
import styles from "../../styles/TodoCreate.module.css";

export default function TodoCreate() {
  const { addTask, taskInput, setTaskInput } = useTodoContext();
  return (
    <div className={styles.createTaskContainer}>
      <input
        type="text"
        value={taskInput}
        onChange={(event) => setTaskInput(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            addTask();
          }
        }}
        placeholder="Write task here..."
        className={styles.taskInput}
      />
      <button onClick={addTask} className={styles.addBtn}>
        Add New Task
      </button>
    </div>
  );
}
