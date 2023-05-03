import { AiOutlinePlus } from "react-icons/ai";

export const ColorList = ({setCustomColorClicked, setColorClicked, setPriorityColor, arrayNewColors}) => {
    const openSelectOwnColor = (event) => {
        event.stopPropagation();
        setColorClicked(false)
        setCustomColorClicked(true)
    }
  return (
    <>
    <div className='fixed top-0 right-0 left-0 bottom-0 w-screen h-screen z-10' onClick={(event) => { event.stopPropagation(); setColorClicked(false) }}></div>
    <div className='absolute -top-3 -left-2.5 flex justify-center items-center p-3 rounded-lg w-fit h-[16vh] bg-white z-10'>
        <ul className='flex flex-col gap-3 flex-wrap justify-center items-center h-full min-w-[15vw]'>
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
  )
}
