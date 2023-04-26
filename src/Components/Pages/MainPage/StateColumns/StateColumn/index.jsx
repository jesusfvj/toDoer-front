import { TodoContainer } from './TodoContainer';

export const StateColumn = ({ title, stateTodo, filteredTodos }) => {
    return (
        <section className="min-w-[30vw] h-full bg-[url('../../../../src/assets/images/gradient2.png')] bg-cover rounded-xl">
            <div className="flex justify-center items-center h-1/6 rounded-t-xl">
                <p className='text-center font-dancing text-xl text-white'>{title}</p>
            </div>
            <div className="px-2 py-3 h-5/6 flex flex-col justify-start gap-2 overflow-y-auto">
                {!filteredTodos.length==0
                ?
                (filteredTodos.map(({ content, _id }) => {
                    return (
                        <TodoContainer
                            content={content}
                            stateTodo={stateTodo}
                            id={_id}
                            filteredTodos={filteredTodos}
                            key={_id}
                        />
                    )
                }))
                :
                <div className="flex justify-center items-center h-full w-full px-8">
                    <p className="font-dancing text-4xl text-center text-[rgba(255,255,255,0.8)]">You don't have any tasks in this list!</p>
                </div>
                }
            </div>
        </section>
    )
}
