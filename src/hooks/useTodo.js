import { useState } from "react";
import { formatCreatedAt, formatLastUpdated } from "../utils/dateFormatter";
import { useLocalStorage } from "./useLocalStorage";

export default function useTodo() {
  const [allTasks, setAllTasks] = useLocalStorage("savedTasks", []);
  const [taskInput, setTaskInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); //all, completed, incomplete
  // const [sortBy, setSortBy] = useState("date-desc"); // date-desc, date-asc, alphabetical-asc, alphabetical-desc

  const addTask = () => {
    const timestamp = Date.now();
    const newTaskItem = {
      id: timestamp,
      text: taskInput.trim(),
      completed: false,
      dateCreated: formatCreatedAt(timestamp),
      lastEdited: formatLastUpdated(timestamp),
    };
    setAllTasks((prevAllTasks) => [...prevAllTasks, newTaskItem]);
    setTaskInput("");
  };

  // editTask
  const editTask = (taskId, newTaskInput) => {
    setAllTasks((prevAllTasks) =>
      prevAllTasks.map((savedTask) =>
        savedTask.id === taskId
          ? {
              ...savedTask,
              text: newTaskInput.trim(),
              lastEdited: formatLastUpdated(Date.now()),
            }
          : savedTask
      )
    );
  };

  // deletes a task (non-retrievable)
  const deleteTask = (taskId) => {
    setAllTasks((prevAllTasks) =>
      prevAllTasks.filter((savedTask) => savedTask.id !== taskId)
    );
  };

  // deletes all completed tasks
  const deleteAllCompleted = () => {
    setAllTasks((prevAllTasks) =>
      prevAllTasks.filter((savedTask) => !savedTask.completed)
    );
  };

  const toggleComplete = (taskId) => {
    setAllTasks((prevAllTasks) =>
      prevAllTasks.map((savedTask) =>
        savedTask.id === taskId
          ? {
              ...savedTask,
              completed: !savedTask.completed,
              lastEdited: formatLastUpdated(Date.now()),
            }
          : savedTask
      )
    );
  };

  const sortTasks = (tasks) => {
    const sortedTasks = [...tasks];

    switch (sortBy) {
      default:
        return sortTasks;
    }
  };

  // display only, no state change
  const getFilteredTasks = () => {
    let filteredTasks = allTasks;

    // filter tasks by status
    if (filterStatus === "completed") {
      filteredTasks = filteredTasks.filter((task) => task.completed);
    } else if (filterStatus === "incomplete") {
      filteredTasks = filteredTasks.filter((task) => !task.completed);
    }

    // filter tasks by search
    if (searchQuery.trim() !== "") {
      filteredTasks = filteredTasks.filter((task) =>
        task.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredTasks;
  };

  // state change
  const getAllCompleted = () => {
    return allTasks.filter((savedTask) => savedTask.completed);
  };
  const getAllIncomplete = () => {
    return allTasks.filter((savedTask) => !savedTask.completed);
  };

  return {
    // states
    allTasks,
    taskInput,
    setTaskInput,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    // actions
    addTask,
    deleteTask,
    deleteAllCompleted,
    toggleComplete,
    editTask,
    sortTasks,
    // getter
    getAllCompleted,
    getAllIncomplete,
    getFilteredTasks,
  };
}
