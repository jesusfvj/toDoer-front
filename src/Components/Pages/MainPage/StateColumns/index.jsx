import { StateColumn } from './StateColumn';
import { useUser } from '../../../../context/UserContext/UserContext';
import { getTodosAPI } from '../../../../API/TodoApi';
import { useEffect, useState } from 'react';
import { useTodo } from '../../../../Context/TodoContext/TodoContext';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import { toCamelCase, toPascalCase } from '../../../../utils/stringTreatment';
import { useForm } from "react-hook-form"

const StateColumns = () => {
    const { user: { _id } } = useUser();
    const { todos, setTodos } = useTodo();
    const [creatingNewColumn, setCreatingNewColumn] = useState(false)
    const { register, reset, formState: { errors }, handleSubmit } = useForm();
    const [stateColumns, setStateColumns] = useState({
        pending: {
            title: "Pending",
            stateTodo: "pending",
            filteredTodos: "todosPending"
        },
        inProgress: {
            title: "In progress",
            stateTodo: "inProgress",
            filteredTodos: "todosInProgress"
        },
        finished: {
            title: "Finished",
            stateTodo: "finished",
            filteredTodos: "todosFinished"
        }
    })

    const createNewStateColum = () => {
        setCreatingNewColumn(true);
    }

    const acceptNewColumn = (dataFromForm) => {
        const titleNewColumn = Object.values(dataFromForm)[0]
        const camelCaseString = toCamelCase(titleNewColumn);
        const pascalCaseString = toPascalCase(titleNewColumn);

        setStateColumns({
            ...stateColumns,
            [camelCaseString]: {
                title: titleNewColumn,
                stateTodo: camelCaseString,
                filteredTodos: `todos${pascalCaseString}`
            }
        })
        setTodos({...todos, [`todos${pascalCaseString}`]:[]})
        setCreatingNewColumn(false);
    }

    const declineNewColumn = () => {
        setCreatingNewColumn(false);
        reset({ titleNewColum: "" });
    }

    useEffect(() => {
        const getTodo = async () => {
            const response = await getTodosAPI(_id);
            setTodos(response.todos)
        }
        getTodo();
    }, [])

    return (
        <div className='flex w-full gap-6 h-[80vh] py-10 overflow-x-auto'>
            {Object.values(stateColumns).map(( { title, stateTodo, filteredTodos }) => {
                return <StateColumn key={title} title={title} stateTodo={stateTodo} filteredTodos={todos[filteredTodos]} />
            })}
            <div onClick={createNewStateColum} className='flex justify-center items-center h-15 min-w-[3vw] rounded-xl border transition duration-500 hover:bg-gray-200 cursor-pointer text-blue-300 hover:text-blue-600'>
                <AiOutlinePlus />
            </div>
            {creatingNewColumn &&
                <div className='fixed inset-0 flex items-center justify-center'>
                    <div className="fixed inset-0 bg-black opacity-50"></div>
                    <div className="bg-white p-6 rounded-lg z-10">
                        <p>Insert the head of the new column</p>
                        <form onSubmit={handleSubmit(acceptNewColumn)} className="flex justify-between items-center bg-[rgba(255,255,255,0.8)] px-6 rounded-lg min-h-[10vh]">
                            <div className="overflow-x-hidden">
                                <input type="text"
                                    className='bg-transparent text-sm'
                                    autoFocus
                                    {...register('titleNewColum', {
                                        required: true
                                    })} />
                            </div>
                            <div className="rounded-xl border flex justify-center items-center transition duration-500 hover:bg-gray-200 gap-2 p-2">
                                <button type="submit" className="text-sm text-blue-300 transition duration-500 hover:text-blue-600"><AiOutlineCheck /></button>
                                <button onClick={declineNewColumn} className="text-red-300 transition duration-500 hover:text-red-600"><RxCross2 /></button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </div>
    )
}

export default StateColumns;