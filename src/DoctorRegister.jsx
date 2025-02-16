import axios from "axios"
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import { DoctorRegisterValidationSchema } from "./assets/ValidationSchemaDoctorRegister"
import Swal from "sweetalert2"
import backgroundImage from './images/bg.jpg'
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"

const RegisterDoctor = () => {

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    
    
    const initalValues =  {
        fullName: "",
        email: "",
        phone: "",
        specialty: "",
        experiance:"",
        password: ""
    }

    const onSubmit = async(values,action) => {
        try{
            await axios.post(
                "http://localhost:2000/api/registerDoctor",
                values
            );

            action.resetForm()
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: " Congratulation,your account has been successfully created",
                showConfirmButton:false,
                timer:1500
                
            });
            navigate('/loginDoctor')

        }
        catch(error){
            
            if(error.response && error.response.status == 409){
                Swal.fire({
                    icon: "warning",
                    // title: "Incorrect EmailId",
                    text: "This email is already registered!",
                    });
            }
            else{
                setFieldError(
                    "email",
                    error.message
                    );
            }
        }
        
    }

    const { 
        values, 
        errors, 
        handleSubmit, 
        handleChange, 
        handleBlur, 
        touched} = useFormik({
            initialValues:initalValues,
            validationSchema:DoctorRegisterValidationSchema,
            onSubmit:onSubmit
        })

    
    return(
        <div 
        className="flex min-h-screen justify-center items-center px-3 py-9 lg:px-8 "
       style={{
            backgroundImage: `url(${backgroundImage})`,  // Correct path for the public folder
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }}
        >
            <div 
            className="border  py-6 px-20 rounded-2xl drop-shadow-lg justify-center"
            style={{
                backgroundColor: "rgba(255, 255, 255, 0.5)", // Transparent white background for the form
                backdropFilter: "blur(10px)", // Blur effect on the background
            }}
            >

                <form onSubmit={handleSubmit} method="POST" className="flex">
                    
                    <div>
                        <div className="pb-5 sm:max-auto sm:w-full sm:max-w-sm ">
                            <h2 className="font-bold font-sans text-slate-600 text-3xl pb-5">Create a new account</h2>
                        </div>
                        <div className="flex justify-between gap-3">
                            <div className="flex flex-col">
                                <label>Full Name</label>
                                <input 
                                type="text"
                                autoComplete="off"
                                autoSave="off"
                                name="fullName"
                                value={values.fullName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                className="block w-full rounded-md mt-2  bg-slate-200 px-3 py-2.5 focus:outline-slate-400 focus:outline text-base  border-slate-400 text-gray-900  placeholder:text-gray-800 focus:outline focus:outline-none sm:text-sm/6"
                                />
                                {touched.fullName && errors.fullName ? (
                                    <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                                ) : null}
                            </div>

                            <div className="flex flex-col">
                                <label >Email</label>
                                <input 
                                type="email"
                                autoComplete="off"
                                autoSave="off"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                className="block w-full rounded-md mt-2  bg-slate-200 px-3 py-2.5 focus:outline-slate-400 focus:outline text-base  border-slate-400 text-gray-900  placeholder:text-gray-800 focus:outline focus:outline-none sm:text-sm/6"
                                />
                                {touched.email && errors.email ? (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                ) : null}
                            </div>

                            <div className="flex flex-col">
                                <label >Phone</label>
                                <input 
                                type="string"
                                autoComplete="off"
                                    autoSave="off"
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required
                                    className="block w-full rounded-md mt-2  bg-slate-200 px-3 py-2.5 focus:outline-slate-400 focus:outline text-base  border-slate-400 text-gray-900  placeholder:text-gray-800 focus:outline focus:outline-none sm:text-sm/6"
                                />
                                {touched.phone && errors.phone ? (
                                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                ) : null}
                            </div>
                        </div>

                        <div className="flex flex-row gap-3">
                            <div className="flex flex-col w-1/2">
                                <label className="mt-5">Specialty</label>
                                <select 
                                name="specialty" 
                                value={values.specialty}  
                                onChange={handleChange}   
                                onBlur={handleBlur} 
                                className="block w-full rounded-md mt-2  bg-slate-200 px-3 py-2.5 focus:outline-slate-400 focus:outline text-base  border-slate-400 text-gray-900  placeholder:text-gray-800 focus:outline focus:outline-none sm:text-sm">
                                    <option value="">Select Your Specialty</option>
                                    <option value="Cardiology">Cardiology</option>
                                    <option value="Dermatology">Dermatology</option>
                                    <option value="Neurology">Neurology</option>
                                    <option value="Pediatrics">Pediatrics</option>
                                    <option value="Orthopedics">Orthopedics</option>
                                </select>
                                {touched.specialty && errors.specialty ? (
                                    <p className="text-red-500 text-sm mt-1">{errors.specialty}</p>
                                ) : null}
                            </div>
                            <div className="flex flex-col w-1/2">
                                <label className="mt-5">Experiance</label>
                                <select 
                                name="experiance" 
                                value={values.experiance}  
                                onChange={handleChange}   
                                onBlur={handleBlur} 
                                className="block w-full rounded-md mt-2  bg-slate-200 px-3 py-2.5 focus:outline-slate-400 focus:outline text-base  border-slate-400 text-gray-900  placeholder:text-gray-800 focus:outline focus:outline-none sm:text-sm/6">
                                    <option value=""></option>
                                    <option value="1">1 Year</option>
                                    <option value="2">2 Years</option>
                                    <option value="3">3 Years</option>
                                    <option value="4">4 Years</option>
                                    <option value="5">5 Years</option>
                                    <option value="6">6 Years</option>
                                    <option value="7">7 Years</option>
                                    <option value="8">8 Years</option>
                                    <option value="9">9 Year</option>
                                    <option value="10">10+ Years</option>
                                </select>
                                {touched.experiance && errors.experiance ? (
                                    <p className="text-red-500 text-sm mt-1">{errors.experiance}</p>
                                ) : null}
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="mt-5">Password</label>
                            <div className="relative h-12">
                                <input 
                                type={ showPassword? 'text':'password'}
                                autoComplete="off"
                                autoSave="off"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required 
                                className="block w-full rounded-md mt-2  bg-slate-200 px-3 py-2.5 focus:slate-pink-400 focus:outline text-base  border-slate-400 text-gray-900  placeholder:text-gray-800 focus:outline focus:outline-none sm:text-sm/6"
                                />
                                {touched.password && errors.password ? (
                                    <p className="text-red-500 text-sm mt-1">
                                    {errors.password}
                                    </p>
                                ) : null}
                                {/* Show/Hide Password Toggle */}
                                <button 
                                    type="button" 
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/4 pt-2 text-gray-700"
                                >
                                    {showPassword ? <EyeOff/> : <Eye/>}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button
                            autoSave="off"
                            className="mt-9 bg-slate-500  px-28 text-white mb-3  py-2 rounded-3xl"
                            >
                                Sign Up
                            </button>
                            
                        </div>
                    </div>
                </form>
                <p 
                className="flex justify-center"
                >
                    Already have an account?
                    <Link
                        to="/loginDoctor"
                        className="text-red-500 ms-1 tracking-tight hover:text-blue-800 hover:underline"
                    >

                        sign In now
                </Link>
                </p>
            </div>
        </div>
    )
}

export { RegisterDoctor}