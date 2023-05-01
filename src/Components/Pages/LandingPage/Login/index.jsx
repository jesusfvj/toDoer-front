import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../context/UserContext/UserContext";
import { InputWithLabel } from "../../../Base/InputWithLabel";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastMessageError, toastMessageSuccess } from "../../../../utils/toaster";
import { loginWithFirebase } from "../../../../utils/firebaseLoginRegister";
import { GoogleButton } from "../../../Base/GoogleButton";


export const Login = ({ changeLogRegister }) => {
  const errorTextClassName = "text-xs text-red-80 text-center";
  const navigate = useNavigate();
  const { user, loginUser } = useUser();
  const token = window.localStorage.getItem("token");
  const [ messageEmail, setMessageEmail ] = useState("")
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginWithFirebase = async () => {
    const responseFirebase = await loginWithFirebase();
    const {
      email,
      uid
    } = responseFirebase.user;
    const response = await loginUser({
      email,
      password: uid,
    });
    if (response.ok) {
      toastMessageSuccess("Login successful.");
      setTimeout(() => {
        navigate("/main");
      }, 1500);
    } else {
      setMessageEmail(response.msg)
      toastMessageError(response.msg)
    }
  }

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogInSubmit = async (event) => {
    event.preventDefault();
    const response = await loginUser(loginData)
    if (response.ok) {
      toastMessageSuccess("Login successful.");
      setTimeout(() => {
        navigate("/main");
      }, 2500);
    } else {
      setMessageEmail(response.msg)
      toastMessageError(response.msg)
    }
  }

  return (
    <div className='flex flex-col justify-center items-center gap-5 w-[30rem] h-[30rem] rounded-full border-4 bg-[rgba(0,0,0,0.04)]'>
      <h2 className="font-dancing text-5xl text-white">toDoer</h2>
      <form onSubmit={handleLogInSubmit} className='flex flex-col justify-center items-center w-[20vw] gap-3'>
        <InputWithLabel
          name="email"
          label="Email"
          type="email"
          value={loginData.email}
          onInputChange={handleLoginInputChange}
        />
        <InputWithLabel
          name="password"
          label="Password"
          type="password"
          value={loginData.password}
          onInputChange={handleLoginInputChange}
        />
        {messageEmail && (<p className={errorTextClassName}>{messageEmail}</p>)}
        {user && !token && (<p className={errorTextClassName}>Session has expired, please log in again.</p>)}
        <button
          type="submit"
          className="w-fit font-dancing text-2xl text-white transition duration-500 hover:text-[rgb(211,105,145)] mt-[0.5rem]"
        >Log in</button>
      </form>
      
      <GoogleButton firebaseFunction={handleLoginWithFirebase} text="Login with Google" />

      <div className="flex flex-col justify-center items-center gap-1">
        <p className="text-center text-md text-gray-400">I don't have an account!</p>
        <button
          onClick={changeLogRegister}
          className="cursor-pointer font-dancing text-xl text-white transition duration-500 hover:text-[rgb(211,105,145)]"
        >
          Register
        </button>
      </div>
      <ToastContainer />
    </div>
  )
}
