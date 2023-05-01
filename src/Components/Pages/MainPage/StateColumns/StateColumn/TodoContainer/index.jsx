import { changeTodoStateAPI, deleteTodoAPI, updateTodosAPI } from '../../../../../../API/TodoApi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastMessageError, toastMessageSuccess } from '../../../../../../utils/toaster';
import { useTodo } from '../../../../../../Context/TodoContext/TodoContext';
import { useState } from 'react';
import { AiFillDelete, AiFillEdit, AiOutlineCheck, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import { useForm } from 'react-hook-form';
import { useUser } from '../../../../../../context/UserContext/UserContext';
import { AiOutlinePlus } from 'react-icons/ai';
import { ModalColor } from '../../../../../Base/ModalColor';

export const TodoContainer = ({ content, stateTodo, id, filteredTodos, arrayNewColors, setArrayNewColors }) => {
    const { user: { _id } } = useUser();
    const { todos, setTodos } = useTodo();
    const [todoIsEditing, setTodoIsEditing] = useState(false)
    const [colorClicked, setColorClicked] = useState(false)
    const [customColorClicked, setCustomColorClicked] = useState(false)
    const [priorityColor, setPriorityColor] = useState("#FDE68A")
    const [stateTodoRender, setStateTodoRender] = useState(stateTodo)
    const [colorPicker, setColorPicker] = useState({
        color: "#8a4949"
    })
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const deleteTodo = async (id) => {
        const response = await deleteTodoAPI(id);
        if (response.ok) {
            const { deletedTodo: { content, state } } = response
            const todosUpdated = filteredTodos.filter(todo => todo._id !== id);
            const todoState = "todos" + state.charAt(0).toUpperCase() + state.slice(1);
            setTodos({ ...todos, [todoState]: todosUpdated });
            toastMessageSuccess(`Your task: "${content}" has being successfuly deleted.`);
        } else {
            toastMessageError(response.msg)
        }
    }

    const editTodoFront = () => {
        setTodoIsEditing(true);
    }

    const acceptEdit = async (todoEditContent) => {
        const response = await updateTodosAPI(todoEditContent, id);
        if (response.ok) {
            const { updatedTodo: { content, state }, originalTodo } = response
            const todosUpdated = filteredTodos.map(todo => {
                if (todo._id === id) {
                    todo.content = content
                }
                return todo
            });
            const todoState = "todos" + state.charAt(0).toUpperCase() + state.slice(1);
            setTodos({ ...todos, [todoState]: todosUpdated });
            toastMessageSuccess(`Your task: "${originalTodo.content}" has being successfuly updated to "${content}".`);
            setTodoIsEditing(false)
        } else {
            toastMessageError(response.msg)
        }
    }

    const declineEdit = () => {
        setTodoIsEditing(false);
        reset({ newContent: content });
    }

    const changeStateTodo = async (directionOfChange) => {
        const response = await changeTodoStateAPI(stateTodo, directionOfChange, id, _id);
        if (response.ok) {
            const { newState: { state }, originalState, todosPending, todosInProgress, todosFinished } = response;
            setTodos({ "todosPending": todosPending, "todosInProgress": todosInProgress, "todosFinished": todosFinished })
            toastMessageSuccess(`The state of your task: "${originalState.state}", has being successfuly updated to "${state}".`);
        } else {
            toastMessageError(response.msg)
        }
    }

    const updateColorPriority = () => {
        setColorClicked(true)
    }

    const openSelectOwnColor = (event) => {
        event.stopPropagation();
        setColorClicked(false)
        setCustomColorClicked(true)
    }

    const acceptNewColor = (event) => {
        event.stopPropagation();
        setArrayNewColors([...arrayNewColors, colorPicker.color])
        setCustomColorClicked(false)
    }

    return (
        <>
            {!todoIsEditing ?
                <div className="flex justify-between items-center bg-[rgba(255,255,255,0.8)] px-6 rounded-lg min-h-[10vh] overflow-visible">
                    <div className='flex gap-2'>
                        <div style={{ backgroundColor: priorityColor }} className={`relative w-5 h-5 rounded-full ${!colorClicked && 'cursor-pointer'}`} onClick={updateColorPriority}>
                            {colorClicked &&
                                <>
                                    <div className='fixed top-0 right-0 left-0 bottom-0 w-screen h-screen z-10' onClick={(event) => { event.stopPropagation(); setColorClicked(false) }}></div>
                                    <div className='absolute -top-3 -left-2.5 flex justify-center items-center p-3 rounded-lg w-fit h-[16vh] bg-white z-10'>
                                        <ul className='flex flex-col gap-3 flex-wrap justify-center items-center h-full min-w-[20vw]'>
                                            <li className="relative w-5 h-5 rounded-full bg-yellow-200 cursor-pointer" onClick={(event) => { setPriorityColor("#FDE68A"); event.stopPropagation(); setColorClicked(false); }}></li>
                                            <li className="relative w-5 h-5 rounded-full bg-red-200 cursor-pointer" onClick={(event) => { setPriorityColor("#FECACA"); event.stopPropagation(); setColorClicked(false) }}></li>
                                            <li className="relative w-5 h-5 rounded-full bg-green-200 cursor-pointer" onClick={(event) => { setPriorityColor("A7F3D0"); event.stopPropagation(); setColorClicked(false) }}></li>
                                            <li className="relative w-5 h-5 rounded-full bg-orange-200 cursor-pointer" onClick={(event) => { setPriorityColor("#FBD38D"); event.stopPropagation(); setColorClicked(false) }}></li>
                                            <li className="relative w-5 h-5 rounded-full bg-purple-200 cursor-pointer" onClick={(event) => { setPriorityColor("#D6BCFA"); event.stopPropagation(); setColorClicked(false) }}></li>
                                            <li className="relative w-5 h-5 rounded-full bg-blue-200 cursor-pointer" onClick={(event) => { setPriorityColor("#BFDBFE"); event.stopPropagation(); setColorClicked(false) }}></li>
                                            {(arrayNewColors) &&
                                                arrayNewColors.map((newColor) => {
                                                    return (
                                                        <li key={newColor} style={{ backgroundColor: newColor }} className={`relative w-5 h-5 rounded-full cursor-pointer`} onClick={(event) => { setPriorityColor(newColor); event.stopPropagation(); setColorClicked(false) }}></li>
                                                    )
                                                })
                                            }{arrayNewColors.length<9 &&
                                            <li className="relative flex justify-center items-center w-5 h-5 rounded-full border cursor-pointer transition duration-500 hover:bg-gray-200 text-blue-300 hover:text-blue-600" onClick={openSelectOwnColor}>
                                                <AiOutlinePlus />
                                            </li>}
                                        </ul>
                                    </div>
                                </>
                            }
                        </div>
                        <p className="text-sm">{content}</p>
                    </div>
                    <div className='rounded-xl border flex justify-center items-center transition duration-500 hover:bg-gray-200 gap-2 p-2'>
                        {stateTodoRender != "pending" && <button onClick={() => changeStateTodo("left")} className="text-orange-200 transition duration-500 hover:text-orange-600"><AiOutlineArrowLeft /></button>}
                        {stateTodoRender != "finished" && <button onClick={() => changeStateTodo("right")} className="text-green-300 transition duration-500 hover:text-green-600"><AiOutlineArrowRight /></button>}
                        <button onClick={() => editTodoFront(id)} className="text-blue-300 transition duration-500 hover:text-blue-600"><AiFillEdit /></button>
                        <button onClick={() => deleteTodo(id)} className="text-red-300 transition duration-500 hover:text-red-600"><AiFillDelete /></button>
                    </div>
                </div>
                :
                <form onSubmit={handleSubmit(acceptEdit)} className="flex justify-between items-center bg-[rgba(255,255,255,0.8)] px-6 rounded-lg min-h-[10vh]">
                    <div className="overflow-x-hidden">
                        <input type="text"
                            className='bg-transparent text-sm'
                            autoFocus
                            defaultValue={content}
                            {...register('newContent', {
                                required: true
                            })} />
                    </div>
                    <div className="rounded-xl border flex justify-center items-center transition duration-500 hover:bg-gray-200 gap-2 p-2">
                        <button type="submit" className="text-sm text-blue-300 transition duration-500 hover:text-blue-600"><AiOutlineCheck /></button>
                        <button onClick={declineEdit} className="text-red-300 transition duration-500 hover:text-red-600"><RxCross2 /></button>
                    </div>
                </form>
            }
            {customColorClicked && <ModalColor setCustomColorClicked={setCustomColorClicked} colorPicker={colorPicker} setColorPicker={setColorPicker} acceptNewColor={acceptNewColor} />}
            <ToastContainer />
        </>
    )
}
