import './App.css';
import React from "react";
import axios from "axios";
import { useFormik } from 'formik';
import Swal from "sweetalert2"
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ValidationLoginSchema } from './assets/ValidationLoginSchema';
import { PatientHome } from './Home';
import patientloginimage from './images/patientlogin.jpg'



const PatientLogin = () => {

  const [isLogin, setisLogin] = useState(false)
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const {
    values,
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
  } = useFormik({
    initialValues: initialValues,
    validationSchema:ValidationLoginSchema,
    onSubmit: async (values, action) => {
      try {
        const response = await axios.post("http://localhost:2000/api/patientlogin", values);
        
        if (response.status === 200) {
          const { accessToken, data } = response.data;

          // Store the token in localStorage
          localStorage.setItem("authToken", accessToken);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Login successful',
            showConfirmButton: false,
            timer: 4000,
          });

          // Redirect to home
          navigate('/patienthome');
          action.resetForm();
        }
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: err.response?.data?.message || "An error occurred",
        });
      }
    },
  });

  return (
    <div >
        {
            isLogin ?(
                <PatientHome/>
            ):( 
                <div
                className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8 "
                style={{
                        backgroundImage: `url(${patientloginimage})`,  // Correct path for the public folder
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }} 
                >
                    <div 
                    className="border py-10 px-20 w-1/3 bg-white rounded-2xl drop-shadow-lg"
                    style={{
                        backgroundColor: "rgba(171, 167, 167, 0.8)", // Transparent white background for the form
                        backdropFilter: "blur(10px)", // Blur effect on the background
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional shadow for the form
                    }}
                    >
                        <div  className="pb-7 sm:max-auto sm:w-full sm:max-w-sm ">
                            <h2 className="font-bold font-sans ms-16 text-3xl pb-5">Login</h2>
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
                                        className="block w-full rounded-md mt-2  bg-slate-100 py-2.5 focus:outline-blue-400 focus:outline text-base  border-slate-400 text-gray-900  placeholder:text-gray-800 focus:outline focus:outline-none sm:text-sm/6"
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
                                        className="block w-full rounded-md mt-2  bg-slate-100 px-3 py-2.5 focus:outline-blue-400 focus:outline text-base  border-slate-400 text-gray-900  placeholder:text-gray-800 focus:outline focus:outline-none sm:text-sm/6"
                                        />
                                        {touched.password && errors.password ? (
                                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                        ) : null}
                                    </div>
                                    <div className="text-sm mt-1 items-end">
                                        <Link to='/forgotpassword'  
                                        className="font-semibold flex justify-end text-indigo-600 justify-end hover:text-indigo-800">
                                            Forgot password?
                                        </Link>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <button
                                        className="mt-9 bg-slate-500 hover:bg-white hover:text-blue-900 text-white mb-3 px-20 py-2 rounded-3xl"

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
                                to="/patientregister"
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
};

export default PatientLogin;
