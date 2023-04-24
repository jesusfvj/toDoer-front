import { TodoForm, StateColumns } from "../Components/Pages/MainPage";

const MainPage = () => {

  return (
      <div className="flex flex-col w-[85%] p-8">
        <TodoForm />
        <StateColumns />
      </div>
  )
}

export default MainPage;