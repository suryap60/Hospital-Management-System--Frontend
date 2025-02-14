import { useFormik } from "formik"
import { AdminHome } from "./AdminHome"
import { ValidationLoginSchema } from "./assets/ValidationLoginSchema"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import Swal from "sweetalert2"
import backgroundImageLogin from './images/adminLogin.jpg'


const AdminLogin = ()=>{

    const [isLogin, setisLogin] = useState(false)

    const navigation = useNavigate()

    const initalValues = {
        email: "",
        password: "",
    }

    const onSubmit = async(values,action)=>{
        try{
            const response = await axios.post(
                "http://localhost:2000/api/adminLogin",
                values
            );
    
            const token = response.data.accessToken 
            localStorage.setItem("authToken",token)
            action.resetForm();
            setisLogin(true)
            navigation('/adminHome')
            Swal.fire({
                icon: "success",
                title: "Your Login Successfully",
                showConfirmButton: false,
                timer: 1500
              });
        }
        catch(error){
            if (error.response) {
                const errorMessage = error.response.data.message; // Backend sends error messages in `message`
                
                // Handling for specific errors based on the backend response
                if (error.response.status === 404 && errorMessage === "Email does not exist") {
                  Swal.fire({
                    title: "Incorrect EmailId",
                    text: "The email that you've entered is incorrect.Please try again.",
                    showConfirmButton: false,
                    timer: 1500
                  });
                } 
                if (error.response.status === 400 && errorMessage === "Password is incorrect") {
                  Swal.fire({
                    title: "Incorrect Password",
                    text: "The password that you've entered is incorrect.Please try again.",
                    showConfirmButton: false,
                    timer: 1500
                  });
                } 
               
              } 
        }
    }


    const { 
        values, 
        errors, 
        handleSubmit, 
        handleChange, 
        handleBlur, 
        touched,
        } = useFormik({
            initialValues : initalValues,
            validationSchema : ValidationLoginSchema,
            onSubmit : onSubmit,
        })

    return (
        <div >
            {
                isLogin ?(
                    <AdminHome/>
                ):( 
                    <div
                    className="flex min-h-screen flex-col justify-center items-center sm:px-6 py-12 lg:px-8"
                    style={{
                            backgroundImage: `url(${backgroundImageLogin})`,  // Correct path for the public folder
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }} 
                    >
                        <div 
                        className="border py-10 px-20 w-full max-w-md sm:max-w-lg lg:w-1/3 bg-white p-6 sm:p-10 rounded-2xl drop-shadow-lg"
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.7)", // Transparent white background for the form
                            backdropFilter: "blur(10px)", // Blur effect on the background
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional shadow for the form
                        }}
                        >
                            <div  className="pb-7 sm:max-auto sm:w-full sm:max-w-sm ">
                                <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left mb-6">Login</h2>
                            </div>
                            <div>
                                <form 
                                onSubmit={handleSubmit}
                                action="#"
                                method="POST">
                                    <div>
                                        <div className="flex flex-col">
                                            <label>Email</label>
                                            <input 
                                            type="text"
                                            autoComplete="off" 
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            className="block w-full rounded-md mt-2  bg-sky-200 py-2.5 focus:outline-blue-400 focus:outline text-base  border-slate-400 text-gray-900  placeholder:text-gray-800 focus:outline focus:outline-none sm:text-sm/6"
                                            />
                                            {touched.email && errors.email ? (
                                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                            ) : null}
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="mt-5">Password</label>
                                            <input 
                                            type="password"
                                            autoComplete="off"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            className="block w-full rounded-md mt-2  bg-sky-200 px-3 py-2.5 focus:outline-blue-400 focus:outline text-base  border-slate-400 text-gray-900  placeholder:text-gray-800 focus:outline focus:outline-none sm:text-sm/6"
                                            />
                                            {touched.password && errors.password ? (
                                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                            ) : null}
                                        </div>
                                        <div className="text-sm mt-1 items-end">
                                            <Link to='/adminForgotPassword'  
                                            className="font-semibold flex justify-end text-indigo-600 justify-end hover:text-indigo-800">
                                                Forgot password?
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="flex justify-center">
                                        <button
                                            className="mt-9 bg-sky-400 hover:bg-cyan-300 hover:text-blue-400 text-white mb-3 px-20 py-2 rounded-3xl"

                                        >
                                            Login
                                        </button>
                                    </div>
                                </form>
                                <p 
                                className="flex justify-center"
                                >
                                Not a member?
                                <Link
                                    to="/"
                                    className="text-red-600 ms-1 tracking-tight hover:text-blue-800 hover:underline"

                                >
                                    Please Sign Up
                                </Link>
                                </p>

                            </div>

                        </div>
                    </div>
                )
                
            }
        </div>
    )

}

export {AdminLogin}