import { AiOutlineCheck } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import { ChromePicker } from 'react-color';

export const ModalColor = ({setCustomColorClicked, colorPicker, setColorPicker, acceptNewColor}) => {
    return (
        <div className='fixed inset-0 flex items-center justify-center z-10'>
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="flex flex-col gap-3 bg-white p-6 rounded-lg z-10">
                <p>Choose your own color</p>
                <div>
                    <ChromePicker
                        color={colorPicker.color}
                        onChange={(color) => setColorPicker({ color: color.hex })}
                    />
                </div>
                <p></p>
                <div className="w-20 self-center rounded-xl border flex justify-center items-center transition duration-500 hover:bg-gray-200 gap-2 p-2">
                        <button type="button" onClick={acceptNewColor} className="text-sm text-blue-300 transition duration-500 hover:text-blue-600"><AiOutlineCheck /></button>
                        <button type="button" onClick={()=>{setCustomColorClicked(false)}} className="text-red-300 transition duration-500 hover:text-red-600"><RxCross2 /></button>
                    </div>
            </div>
        </div>
    )
}
