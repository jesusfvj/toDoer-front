import { deleteTodoColumnsAPI } from "../../../API/todoColumnApi";
import { useTodoColumn } from "../../../Context/TodoColumnContext/TodoColumnContext";
import { toastMessageError, toastMessageSuccess } from "../../../utils/toaster";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DropDown({ todoColumnId, editTodoColumn, setEditTodoColumn }) {
  const { todoColumns, setTodoColumns } = useTodoColumn();

  const handleSelect = async ({ target: { value } }) => {
    switch (value) {
      case "delete":
        const response = await deleteTodoColumnsAPI(todoColumnId)
        if (response.ok) {
          const { deletedTodoColumn } = response;
          const filteredTodoColumns = todoColumns.filter(todoColumn => todoColumn._id !== todoColumnId);
          setTodoColumns(filteredTodoColumns)
          toastMessageSuccess(`The column "${deletedTodoColumn.title}", was succesfully deleted.`)
        } else {
            toastMessageError(response.msg)
        }
        break;
      case "edit":
        setEditTodoColumn(true)
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <select className="bg-transparent text-white w-4" onChange={handleSelect}>
        <option value="delete">Delete</option>
        <option value="edit">Edit</option>
      </select>
      <ToastContainer />
    </div>
  );
}

export default DropDown;