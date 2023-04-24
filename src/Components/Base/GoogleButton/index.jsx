import { AiOutlineGoogle } from 'react-icons/ai';

export const GoogleButton = ({firebaseFunction, text}) => {
  return (
    <button onClick={firebaseFunction}
            className="bg-cyan-500 px-5 py-1 rounded-full text-white transition duration-500 hover:bg-cyan-700 text-center"
            ><AiOutlineGoogle className="inline-block mb-0.5"/> {text}</button>
  )
}
