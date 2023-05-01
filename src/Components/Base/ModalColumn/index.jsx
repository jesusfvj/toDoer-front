import { AiOutlineCheck } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import { useForm } from "react-hook-form";

export const ModalColumn = ({accept, decline, title, text}) => {
    const { register, reset, formState: { errors }, handleSubmit } = useForm();
    return (
        <div className='fixed inset-0 flex items-center justify-center'>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-white p-6 rounded-lg z-10">
                <p>{text}</p>
                <form onSubmit={handleSubmit(accept)} className="flex justify-between items-center bg-[rgba(255,255,255,0.8)] px-6 rounded-lg min-h-[10vh]">
                    <div className="overflow-x-hidden">
                        <input type="text"
                            className='bg-transparent text-sm'
                            autoFocus
                            defaultValue={title}
                            {...register('titleNewColum', {
                                required: true
                            })} />
                    </div>
                    <div className="rounded-xl border flex justify-center items-center transition duration-500 hover:bg-gray-200 gap-2 p-2">
                        <button type="submit" className="text-sm text-blue-300 transition duration-500 hover:text-blue-600"><AiOutlineCheck /></button>
                        <button type="button" onClick={decline} className="text-red-300 transition duration-500 hover:text-red-600"><RxCross2 /></button>
                    </div>
                </form>
            </div>
        </div>
    )
}
