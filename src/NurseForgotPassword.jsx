import axios from "axios"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { ValidationForgotPasswordSchema } from "./schema/ValidationForgotPasswordSchema"


const NurseForgotPassword = () => {
    const navigate = useNavigate()

    const initialValues ={
        email:"",
        newPassword:"",
    }

    const onSubmit = async(values,action) => {
        try{
             await axios.post(
                "http://localhost:2000/api/nurseforgotPassword",
                values
            );
            Swal.fire({
                icon:"success",
                title:"Password Reset Successfully",
                showConfirmButton:false,
                timer:1500
            });
            action.resetForm()
            navigate('/nurselogin')
        }catch(error){
            if (error.response) {
                const errorMessage = error.response.data.message; // Backend sends error messages in message
                
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
        <div className="max-w-md mx-auto p-8 bg-gradient-to-r from-pink-100 to-purple-100 shadow-xl rounded-lg font-amore">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Forgot Password</h2>
    
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email:</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.email && touched.email && <div className="text-red-500 text-sm">{errors.email}</div>}
            </div>
    
            <div className="mb-6">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">New Password:</label>
                <input
                    type="password"
                    placeholder="Enter your new password"
                    id="newPassword"
                    name="newPassword"
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {errors.newPassword && touched.newPassword && <div className="text-red-500 text-sm">{errors.newPassword}</div>}
            </div>
    
            <button
                type="submit"
                className="w-full py-3 bg-purple-300 text-white font-semibold rounded-md hover:bg-purple-400 transition"
            >
                Reset Password
            </button>
        </form>
    </div>
    
    )
    
}

export default NurseForgotPassword