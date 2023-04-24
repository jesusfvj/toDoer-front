import router from "./Routes"
import { RouterProvider } from "react-router-dom";
import UserProvider from "./context/UserContext/UserContext";
import { TodoProvider } from "./Context/TodoContext/TodoContext";

export default function App() {
  return (
    <UserProvider>
      <TodoProvider>
        <RouterProvider
          router={router}
          fallbackElement={<div>Loading</div>}
        />
      </TodoProvider>
    </UserProvider>
  )
}