import { createContext, useContext } from "react";
import useTodo from "../hooks/useTodo";

const TodoContext = createContext();

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }

  return context;
};

export const TodoProvider = ({ children }) => {
  const todoState = useTodo();

  return (
    <TodoContext.Provider value={todoState}>{children}</TodoContext.Provider>
  );
};
