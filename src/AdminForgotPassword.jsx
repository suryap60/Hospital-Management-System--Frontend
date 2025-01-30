import axios from "axios"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { ValidationForgotPasswordSchema } from "./assets/ValidationForgotPassword"

const ForgotPassword = ()=>{

    const navigate = useNavigate()

    const initialValues ={
        email:"",
        newPassword:"",
    }

    const onSubmit = async(values,action) => {
        try{
             await axios.post(
                "http://localhost:2000/api/forgot-password",
                values
            );
            Swal.fire({
                icon:"success",
                title:"Password Reset Successfully",
                showConfirmButton:false,
                timer:1500
            });
            action.resetForm()
            navigate('/login')
        }catch(error){
            if (error.response) {
                const errorMessage = error.response.data.message; // Backend sends error messages in `message`
                
                // Handling for specific errors based on the backend response
                if (error.response.status === 404 && errorMessage === "Admin Not Found") {
                  Swal.fire({
                    title: "Email doesn't Exist",
                    text: "The email that you've entered is doesn't exist.Please try again.",
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
        touched
    } = useFormik({
        initialValues:initialValues,
        validationSchema:ValidationForgotPasswordSchema,
        onSubmit:onSubmit
    })

    return(
        <div className="flex bg-gradient-to-r from-cyan-200 to-cyan-600 min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8 ">
            <div className="border  py-12 px-20 bg-white rounded-2xl drop-shadow-lg">
                <div className="pb-7 sm:max-auto sm:w-full sm:max-w-sm ">
                    <h2 className="font-bold font-sans  text-3xl pb-5">Forgot Password</h2>
                </div>

                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div>
                                <label  className="flex flex-col">Email</label>
                                <input 
                                type="text"
                                autoComplete="off" 
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                className="block w-full rounded-md mt-2  bg-gray-100 px-3 py-2.5 focus:outline-cyan-600 focus:outline text-base  border-slate-400 text-gray-900  placeholder:text-gray-800 focus:outline focus:outline-none sm:text-sm/6"
                                />
                                {touched.email && errors.email ? (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                ) : null}
                            </div>

                            <div className="mt-5">
                            <label  className="flex flex-col">New Password</label>
                            <input 
                            type="password"
                            autoComplete="off"
                            name="newPassword"
                            value={values.newPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className="block w-full rounded-md mt-2  bg-gray-100 px-3 py-2.5 focus:outline-cyan-600 focus:outline text-base  border-slate-400 text-gray-900  placeholder:text-gray-800 focus:outline focus:outline-none sm:text-sm/6"
                            />
                            {touched.newPassword && errors.newPassword ? (
                                <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                            ) : null}
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="mt-12 bg-cyan-600 px-28 text-white mb-3  py-2 rounded-3xl"
                            >
                                Confirm
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
    
}
export {ForgotPassword}