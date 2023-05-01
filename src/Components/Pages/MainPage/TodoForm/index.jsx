import { useForm } from "react-hook-form"
import { registerTodoAPI } from "../../../../API/TodoApi";
import { useUser } from "../../../../context/UserContext/UserContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastMessageSuccess, toastMessageError } from "../../../../utils/toaster";
import { useTodo } from "../../../../Context/TodoContext/TodoContext";
import { useTodoColumn } from "../../../../Context/TodoColumnContext/TodoColumnContext";
import { useEffect } from "react";

const TodoForm = () => {
  const inputClassName = "peer h-9 w-full border-b-1 text-gray-800 bg-gray-200 text-start rounded-xl px-[0.5rem]"
  const errorTextClassName = "text-xs text-red-800";
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { todos, setTodos } = useTodo();
  const { todoColumns, setTodoColumns } = useTodoColumn();
  const { user } = useUser();

  const onSubmit = async (todo) => {
    const response = await registerTodoAPI(todo, user)
    if (response.ok) {
      const { state } = response.todo;
      const todoState = "todos" + state.charAt(0).toUpperCase() + state.slice(1);
      setTodos({ ...todos, [todoState]: [...todos[todoState], response.todo] });
      toastMessageSuccess("Task registered");
    } else {
      toastMessageError(response.msg)
    }
  }

  return (
    <section className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="flex justify-start items-center gap-2 ">
        <div className="w-[40vw]">
          <input type="text" {...register('content', {
            required: true
          })} className={inputClassName}
            placeholder="Bring it in with the tasks!" />
        </div>
        <div>
          <select {...register('state')} className={`${inputClassName} focus:outline-none cursor-pointer`}>
            {todoColumns.map(({ title, stateTodo }) => {
              return (
                <option key={title} value={stateTodo}>{title}</option>
              )
            })}
          </select>
        </div>
        <div className="rounded-xl p-[0.44rem] border flex justify-center items-center transition duration-500 hover:bg-gray-200">
          <input type="submit" value='Create task' className="text-sm text-gray-400 transition duration-500 hover:text-[rgb(211,105,145)] cursor-pointer" />
        </div>
      </form>
      {errors.todo?.type === 'required' && <p className={errorTextClassName}>Enter a task!</p>}
      <ToastContainer />
    </section>
  )
}

export default TodoForm;