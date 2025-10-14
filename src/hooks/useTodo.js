import { useState } from "react";
import { formatCreatedAt, formatLastUpdated } from "../utils/dateFormatter";
import { useLocalStorage } from "./useLocalStorage";

export default function useTodo() {
  const [allTasks, setAllTasks] = useLocalStorage("savedtasks", []);
  const [taskInput, setTaskInput] = useState("");
  const [timestamp, setTimestamp] = useState(Date.now());
  const [isCompleted, setIsCompleted] = useState(false);

  const addTask = () => {
    const newTaskItem = {
      id: setTimestamp(timestamp),
      text: setTaskInput(taskInput),
      completed: setIsCompleted(false),
      dateCreated: formatCreatedAt(timestamp),
      lastEdited: formatLastUpdated(timestamp),
    };
    setAllTasks([...allTasks, newTaskItem]);
    setTaskInput("");
  };

  const removeTask = (taskId) => {
    setAllTasks(allTasks.filter((savedTask) => savedTask.id !== taskId));
  };

  const toggleCompleted = (task) => {
    const alreadyCompleted = allTasks.some(
      (completedTask) => completedTask.id === task.id
    );
  };

  return { toggleTask, tasks };
}
