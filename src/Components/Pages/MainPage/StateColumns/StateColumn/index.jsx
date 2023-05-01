import { useState } from 'react';
import { useTodoColumn } from '../../../../../Context/TodoColumnContext/TodoColumnContext';
import DropDown from '../../../../Base/DropDown';
import { ModalColumn } from '../../../../Base/ModalColumn';
import { TodoContainer } from './TodoContainer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastMessageError, toastMessageSuccess } from '../../../../../utils/toaster';
import { editTodoColumnsAPI } from '../../../../../API/todoColumnApi';


export const StateColumn = ({ title, stateTodo, filteredTodos, todoColumnId, arrayNewColors, setArrayNewColors }) => {
    const [editTodoColumn, setEditTodoColumn] = useState(false);
    const { todoColumns, setTodoColumns } = useTodoColumn();

    const acceptNewColumnName = async (dataFromForm) => {
        const newTitleColumn = Object.values(dataFromForm)[0]
        const response = await editTodoColumnsAPI(todoColumnId, newTitleColumn)
        if (response.ok) {
            const { originalTodoColumn } = response;
            const filteredTodoColumns = todoColumns.filter(todoColumn => {
                if (todoColumn._id === todoColumnId) {
                    todoColumn.title = newTitleColumn
                }
                return todoColumn;
            });
            setTodoColumns(filteredTodoColumns)
            toastMessageSuccess(`The column "${originalTodoColumn.title}", was succesfully edited to "${newTitleColumn}".`)
        } else {
            toastMessageError(response.msg)
        }
    }
    const declineNewColumnName = () => {
        setEditTodoColumn(false)
    }
    return (
        <section className="min-w-[23vw] h-full bg-[url('../../../../src/assets/images/gradient2.png')] bg-cover rounded-xl overflow-visible">
            <div className="flex justify-center items-center h-1/6 rounded-t-xl">
                <p className='text-center font-dancing text-xl text-white'>{title}</p>
                {title != "Pending" && title != "In progress" && title != "Finished"
                    && <DropDown
                        todoColumnId={todoColumnId}
                        editTodoColumn={editTodoColumn}
                        setEditTodoColumn={setEditTodoColumn}
                    />}
            </div>
            <div className="px-2 py-3 h-5/6 flex flex-col justify-start gap-2 overflow-y-auto">
                {filteredTodos && filteredTodos.length != 0
                    ?
                    (filteredTodos.map(({ content, _id }) => {
                        return (
                            <TodoContainer
                                content={content}
                                stateTodo={stateTodo}
                                id={_id}
                                filteredTodos={filteredTodos}
                                key={_id}
                                arrayNewColors={arrayNewColors}
                                setArrayNewColors={setArrayNewColors}
                            />
                        )
                    }))
                    :
                    <div className="flex justify-center items-center h-full w-full px-8">
                        <p className="font-dancing text-4xl text-center text-[rgba(255,255,255,0.8)]">You don't have any tasks in this list!</p>
                    </div>
                }
            </div>
            {editTodoColumn && <ModalColumn
                accept={acceptNewColumnName}
                decline={declineNewColumnName}
                title={title}
                text="Introduce the new name" />}
            <ToastContainer />
        </section>
    )
}
