import { StateColumn } from './StateColumn';
import { useUser } from '../../../../context/UserContext/UserContext';
import { getTodosAPI } from '../../../../API/TodoApi';
import { useEffect } from 'react';
import { useTodo } from '../../../../Context/TodoContext/TodoContext';

const StateColumns = () => {
    const { user: { _id } } = useUser();
    const { todos, setTodos } = useTodo();

    useEffect(() => {
        const getTodo = async () => {
            const response = await getTodosAPI(_id);
            setTodos(response.todos)
        }
        getTodo();
    }, [])

    return (
        <div className='flex justify-around w-full gap-6 h-[80vh] py-10'>
            <StateColumn title="Pending" stateTodo="pending" filteredTodos={todos.todosPending}/>
            <StateColumn title="In progress" stateTodo="inProgress" filteredTodos={todos.todosInProgress}/>
            <StateColumn title="Finished" stateTodo="finished" filteredTodos={todos.todosFinished}/>
        </div>
    )
}

export default StateColumns;