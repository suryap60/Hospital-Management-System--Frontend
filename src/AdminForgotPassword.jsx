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
        <div>
            <div>
                <h2>Forgot Password</h2>
            </div>

            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <label>Email</label>
                            <input 
                            type="text"
                            autoComplete="off" 
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            />
                            {touched.email && errors.email ? (
                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                            ) : null}
                        </div>

                        <div>
                        <label>New Password</label>
                        <input 
                        type="password"
                        autoComplete="off"
                        name="newPassword"
                        value={values.newPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        required
                        />
                        {touched.newPassword && errors.newPassword ? (
                            <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                        ) : null}
                        </div>
                    </div>
                    <div>
                        <button>
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
    
}
export {ForgotPassword}