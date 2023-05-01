import { StateColumn } from './StateColumn';
import { useUser } from '../../../../context/UserContext/UserContext';
import { getTodosAPI } from '../../../../API/TodoApi';
import { useEffect, useState } from 'react';
import { useTodo } from '../../../../Context/TodoContext/TodoContext';
import { AiOutlinePlus } from 'react-icons/ai';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastMessageSuccess, toastMessageError } from '../../../../utils/toaster';
import { getTodoColumnsAPI, registerColumnAPI } from '../../../../API/todoColumnApi';
import { useTodoColumn } from '../../../../Context/TodoColumnContext/TodoColumnContext';
import { ModalColumn } from '../../../Base/ModalColumn';

const StateColumns = () => {
    const { user: { _id } } = useUser();
    const { todos, setTodos } = useTodo();
    const [creatingNewColumn, setCreatingNewColumn] = useState(false)
    const { todoColumns, setTodoColumns } = useTodoColumn()
    const [arrayNewColors, setArrayNewColors] = useState([])

    const createNewStateColum = () => {
        setCreatingNewColumn(true);
    }

    const acceptNewColumn = async (dataFromForm) => {
        const titleNewColumn = Object.values(dataFromForm)[0]
        const response = await registerColumnAPI(titleNewColumn, _id)
        const { TodoColumn, TodoColumn: { stateTodo, filteredTodos } } = response;
        if (response.ok) {
            setTodoColumns([
                ...todoColumns, {
                    title: titleNewColumn,
                    stateTodo: stateTodo,
                    filteredTodos: filteredTodos,
                    _id: TodoColumn._id
                }
            ])
            setTodos({ ...todos, [filteredTodos]: [] })
            setCreatingNewColumn(false);
            toastMessageSuccess(`A new column: "${titleNewColumn}", was created succesfully.`)
        } else {
            toastMessageError(`The new column "${titleNewColumn}" was not created`)
        }
    }

    const declineNewColumn = () => {
        setCreatingNewColumn(false);
        reset({ titleNewColum: "" });
    }

    useEffect(() => {
        const getTodosAndTodoColumns = async () => {
            const { todoColumns } = await getTodoColumnsAPI(_id);
            setTodoColumns(todoColumns)
            const stateColumns = todoColumns.map(({ stateTodo }) => {
                return stateTodo;
            })
            if (stateColumns) {
                const { todosFilteredByState } = await getTodosAPI(_id, stateColumns);
                setTodos(todosFilteredByState)
            }
        }
        getTodosAndTodoColumns();
    }, [])

    return (
        <div className='flex w-full gap-6 h-[80vh] py-10 overflow-x-auto'>
            {(todoColumns.length && todos) && todoColumns.map(({ title, stateTodo, filteredTodos, _id }) => {
                return <StateColumn
                    key={title}
                    title={title}
                    stateTodo={stateTodo}
                    filteredTodos={todos[filteredTodos]}
                    todoColumnId={_id}
                    arrayNewColors={arrayNewColors}
                    setArrayNewColors={setArrayNewColors}
                    />
            })}
            <div onClick={createNewStateColum} className='flex justify-center items-center h-15 min-w-[3vw] rounded-xl border transition duration-500 hover:bg-gray-200 cursor-pointer text-blue-300 hover:text-blue-600'>
                <AiOutlinePlus />
            </div>
            {creatingNewColumn &&
                <ModalColumn accept={acceptNewColumn} decline={declineNewColumn} text="Insert the head of the new column"/>
            }
            <ToastContainer />
        </div>
    )
}

export default StateColumns;