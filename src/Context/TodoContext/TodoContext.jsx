import { createContext, useContext, useState } from "react";

export const TodoContext = createContext();

export const useTodo = () => {
    const state = useContext(TodoContext);
    return state;
  };

export const TodoProvider = ({ children }) => {
    const [ todos, setTodos ] = useState({})
  
  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;