/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { MdAlternateEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { PiSignInBold } from "react-icons/pi";
import { useForm } from 'react-hook-form';
import { Navigate, useNavigate } from 'react-router';
import toast, { Toaster } from 'react-hot-toast';


const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const AuthUserName = import.meta.env.VITE_AUTH_USERNAME;
    const AuthPassword = import.meta.env.VITE_AUTH_PASSWORD;
    const navigate = useNavigate()

    useEffect(() => {
        const saveduser = JSON.parse(localStorage.getItem("user") || "null");
        if (saveduser) {
            if (AuthUserName == saveduser.username && AuthPassword == saveduser.password) {
                navigate("/");
                toast.success("Log In Success")
            } else {
                localStorage.removeItem('user');
            }
        }
    },);


    const onSubmit = (data) => {
        const loginPayload = {
            username: data?.username,
            password: data?.password,
        };
        if (AuthUserName == loginPayload.username && AuthPassword == loginPayload.password) {
            localStorage.setItem("user", JSON.stringify(loginPayload));
            navigate("/");
        } else {
            toast.error("Invalid Credentials")
        }

    }
    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} />
            <div
                className="min-h-screen flex flex-col items-center justify-center bg-gray-100 lg:px-0 px-4"
            >
                <div
                    className=" flex flex-col bg-white shadow-md px-6 md:px-8 lg:px-10 py-8 rounded-3xl "
                >
                    <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
                        Welcome Back
                    </div>
                    <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
                        Enter your credentials to access your account
                    </div>

                    <div className="mt-10">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="flex flex-col mb-5">
                                <label htmlFor="email" className="mb-1 text-xs tracking-wide text-gray-600">E-Mail Address:</label>
                                <div className="relative">
                                    <div className=" inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                                        <MdAlternateEmail />
                                    </div>

                                    <input id="email" type="email" name="email" className="focus:bg-transparent text-gray-500 text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400 " placeholder="Enter your email" {...register("username", { required: true })} />
                                </div>
                            </div>
                            <div className="flex flex-col mb-6">
                                <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">Password:</label>
                                <div className="relative">
                                    <div
                                        className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400 ">
                                        <span>
                                            <RiLockPasswordFill />
                                        </span>
                                    </div>

                                    <input id="password" type="password" name="password" className="focus:bg-transparent text-gray-500 text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400" placeholder="Enter your password" {...register("password", { required: true })} />
                                </div>
                            </div>

                            <div className="flex w-full">
                                <button type="submit" className=" btn flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in ">
                                    <span className="mr-2 uppercase">Sign In</span>
                                    <span>
                                        <PiSignInBold />
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-6">
                    <a href="#" target="_blank" className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
                        <span className="ml-2">
                            You don't have an account?
                            <a href="#" className="text-xs ml-2 text-blue-500 font-semibold">Register now</a>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;