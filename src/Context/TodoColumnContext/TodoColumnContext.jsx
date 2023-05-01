import { createContext, useContext, useEffect, useState } from "react";
import { getTodosAPI } from "../../API/TodoApi";
import { getTodoColumnsAPI } from "../../API/todoColumnApi";
import { useTodo } from "../TodoContext/TodoContext";
import { useUser } from "..//UserContext/UserContext";

export const TodoColumnContext = createContext();

export const useTodoColumn = () => {
    const state = useContext(TodoColumnContext);
    return state;
  };

export const TodoColumnProvider = ({ children }) => {
  const [todoColumns, setTodoColumns] = useState([])
  const { setTodos } = useTodo();
  const {_id} = JSON.parse(localStorage.getItem("user"));
  /* const { user } = useUser(); No entiendo porque no se coge este context aqui*/

  useEffect(() => {
    const getTodosAndTodoColumns = async () => {
        const {todoColumns} = await getTodoColumnsAPI(_id);
        setTodoColumns(todoColumns)
        const { todos } = await getTodosAPI(_id);
        setTodos(todos)
    }
    getTodosAndTodoColumns();
}, [])

  return (
    <TodoColumnContext.Provider value={{ todoColumns, setTodoColumns }}>
      {children}
    </TodoColumnContext.Provider>
  );
};

export default TodoColumnContext;