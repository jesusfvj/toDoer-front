import router from "./Routes"
import { RouterProvider } from "react-router-dom";
import UserProvider from "./context/UserContext/UserContext";
import { TodoProvider } from "./Context/TodoContext/TodoContext";
import { TodoColumnProvider } from "./Context/TodoColumnContext/TodoColumnContext";

export default function App() {
  return (
    <UserProvider>
      <TodoProvider>
        <TodoColumnProvider>
          <RouterProvider
            router={router}
            fallbackElement={<div>Loading</div>}
          />
        </TodoColumnProvider>
      </TodoProvider>
    </UserProvider>
  )
}