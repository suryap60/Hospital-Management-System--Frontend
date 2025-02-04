import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { SignUpValidationSchema } from "./schema/SignUpValidationSchema";
import nursesignupimage from './images/nursesignup.jpg'

const NurseSignup = () => {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState("");

  const initialValues = {
    name: "",
    email: "",
    password: "",
    age:"",
    phone: "",
    profilePicture: "",
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>formik.setFieldValue("profilePicture", reader.result); // Convert image to Base64
      reader.onerror = (error) => console.error("Error converting image: ", error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: SignUpValidationSchema,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      try {
        const requestData = { ...values, profilePicture };

        await axios.post("http://localhost:2000/api/nurseregister", requestData, {
          headers: { "Content-Type": "application/json" },
        });

        Swal.fire({
          icon: "success",
          title: "Signup Successful!",
          timer: 3000,
          showConfirmButton: false,
        });
        navigate("/nurselogin");
        resetForm();
        setProfilePicture("");
        
      } catch (error) {
        if (error.response?.status === 409) {
          setFieldError("email", "This email is already registered");
        } else {
          Swal.fire({
            icon: "error",
            title: "Signup Failed!",
            text: error.response?.data?.message || "Something went wrong!",
          });
        }
      }
    },
  });

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = formik;

  return (
    <div className="flex min-h-screen justify-center items-center px-3 py-9 lg:px-8"
        style={{
            backgroundImage: `url(${nursesignupimage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
        <div className="border py-6 px-20 rounded-2xl drop-shadow-lg justify-center"
            style={{
                backgroundColor: "rgba(171, 167, 167, 0.8)",
                backdropFilter: "blur(10px)",
            }}>
            <form onSubmit={handleSubmit} method="POST" className="flex flex-col">
                <div className="pb-5 sm:max-auto sm:w-full sm:max-w-sm">
                    <h2 className="font-bold font-sans text-slate-600 text-3xl pb-5 text-center">Create a new account</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label>Full Name</label>
                        <input 
                            type="text"
                            name="name"
                            value={values.name || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className="w-full rounded-md mt-2 bg-slate-100 px-3 py-2.5 border-slate-400 text-gray-900 placeholder:text-gray-800 focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label>Email</label>
                        <input 
                            type="email"
                            name="email"
                            value={values.email || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className="w-full rounded-md mt-2 bg-slate-100 px-3 py-2.5 border-slate-400 text-gray-900 placeholder:text-gray-800 focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label>Mobile Number</label>
                        <input 
                            type="text"
                            name="phone"
                            value={values.phone || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className="w-full rounded-md mt-2 bg-slate-100 px-3 py-2.5 border-slate-400 text-gray-900 placeholder:text-gray-800 focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label>Age</label>
                        <input 
                            type="number"
                            name="age"
                            value={values.age || ""}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className="w-full rounded-md mt-2 bg-slate-100 px-3 py-2.5 border-slate-400 text-gray-900 placeholder:text-gray-800 focus:outline-none"
                        />
                    </div>
                </div>
                <div className="flex flex-col mt-4">
                    <label>Password</label>
                    <input 
                        type="password"
                        name="password"
                        value={values.password || ""}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required 
                        className="w-full rounded-md mt-2 bg-slate-100 px-3 py-2.5 border-slate-400 text-gray-900 placeholder:text-gray-800 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col mt-4">
                    <label>Profile Picture</label>
                    <input 
                        type="file"
                        name="profilePicture"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        className="w-full rounded-md mt-2 bg-slate-100 px-3 py-2.5 border-slate-400 text-gray-900 focus:outline-none"
                    />
                </div>
                <div className="flex justify-center">
                    <button className="mt-6 bg-slate-500 px-28 text-white hover:bg-white hover:text-blue-900 py-2 rounded-3xl">
                        Sign Up
                    </button>
                </div>
            </form>
            <p className="flex justify-center mt-4">
                Already have an account? 
                <Link to="/nurselogin" className="text-red-600 ms-1 tracking-tight hover:text-blue-800 hover:underline">
                    Log In
                </Link>
            </p>
        </div>
    </div>
  );
};

export default NurseSignup;
