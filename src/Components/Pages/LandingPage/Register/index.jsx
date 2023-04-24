import { useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../context/UserContext/UserContext";
import { ageValidator, samePasswordValidator } from "../../../../utils/validator";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastMessageError, toastMessageSuccess } from "../../../../utils/toaster";
import { registerWithFirebase } from "../../../../utils/firebaseLoginRegister";
import { GoogleButton } from "../../../Base/GoogleButton";

export const Register = ({ changeLogRegister }) => {
    const inputClassName = "peer h-9 w-full border-b-1 text-gray-800 bg-white text-center rounded-xl px-[0.5rem]"
    const errorTextClassName = "text-xs text-red-800";
    const { register, watch, formState: { errors }, handleSubmit } = useForm();
    const { registerUser } = useUser();
    const navigate = useNavigate();
    const [messageEmail, setMessageEmail] = useState("")

    const handleRegisterWithFirebase = async () => {
        const responseFirebase = await registerWithFirebase();
        const {
            email,
            displayName,
            uid
        } = responseFirebase.user;
        const response = await registerUser({
            email,
            name: displayName,
            password: uid,
            repPassword: uid,
        });
        if (response.ok) {
            toastMessageSuccess("Registration successful. You will be redirect to the main page.");
            setTimeout(() => {
                navigate("/main");
              }, 2500);
        } else {
            setMessageEmail(response.msg)
            toastMessageError(response.msg)
        }
    }

    const onSubmit = async (data) => {
        const response = await registerUser(data)
        if (response.ok) {
            toastMessageSuccess("Registration successful. You will be redirect to the main page.");
            setTimeout(() => {
                navigate("/main");
              }, 2500);
        } else {
            setMessageEmail(response.msg)
            toastMessageError(response.msg)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center gap-5 w-[38rem] h-[38rem] rounded-full border-2 bg-[rgba(0,0,0,0.04)]">
            <h2 className="font-dancing text-5xl text-white">Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-2 w-[40vw] md:w-[20vw]">
                <div className="w-full">
                    <input type="text" {...register('name', {
                        required: true
                    })} className={inputClassName}
                        placeholder="name" />
                    {errors.name?.type === 'required' && <p className={errorTextClassName}>Name field is required</p>}
                </div>
                <div className="w-full">
                    <input type="text" {...register('lastName', {
                        required: true
                    })} className={inputClassName}
                        placeholder="last name" />
                    {errors.lastName?.type === 'required' && <p className={errorTextClassName}>Last name field is required</p>}
                </div>
                <div className="w-full">
                    <input type="text" {...register('age', {
                        required: true,
                        validate: ageValidator
                    })} className={inputClassName}
                        placeholder="age" />
                    {errors.age && <p className={errorTextClassName}>Age must be greater than 0</p>}
                </div>
                <div className="w-full">
                    <input type="email" {...register('email', {
                        required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
                    })} className={inputClassName}
                        placeholder="email" />
                    {errors.email?.type === 'pattern' && <p className={errorTextClassName}>Enter a valid email</p>}
                    {errors.email?.type === 'required' && <p className={errorTextClassName}>Email field is required</p>}
                </div>
                <div className="w-full">
                    <input type="password" {...register('password', {
                        required: true,
                        pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,}$/
                    })} className={inputClassName}
                        placeholder="password" />
                    {errors.password?.type === 'required' && <p className={errorTextClassName}>Password is required</p>}
                    {/* {errors.password?.type === 'pattern' && <p className={errorTextClassName}>The password must contain at least 8 characters, one number, one capital letter and one special character</p>} */}
                </div>
                <div className="w-full">
                    <input type="password" {...register('repPassword', {
                        required: true,
                        validate: ((value) => { samePasswordValidator(watch('password'), value) })
                    })} className={inputClassName}
                        placeholder="repeat password" />
                    {errors.repPassword && <p className={errorTextClassName}>Both password must match</p>}
                </div>
                {messageEmail && (<p className={errorTextClassName}>{messageEmail}</p>)}
                <input type="submit" value="Register" className="w-fit font-dancing text-2xl text-white transition duration-500 hover:text-[rgb(211,105,145)] mt-[0.5rem]" />
            </form>

            <GoogleButton firebaseFunction={handleRegisterWithFirebase} text="Register with Google" />

            <div className="flex flex-col justify-center items-center gap-1">
                <p className="text-center text-md text-gray-400">I already have an account!</p>
                <button
                    onClick={changeLogRegister}
                    className="cursor-pointer font-dancing text-xl text-white transition duration-500 hover:text-[rgb(211,105,145)]"
                >
                    Log In!
                </button>
            </div>
            <ToastContainer />
        </div>
    )
}
