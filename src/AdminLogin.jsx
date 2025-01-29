import { useFormik } from "formik"
import { AdminHome } from "./AdminHome"
import { ValidationLoginSchema } from "./assets/ValidationLoginSchema"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import Swal from "sweetalert2"


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
                    timer: 3000
                  });
                } 
                if (error.response.status === 400 && errorMessage === "Password is incorrect") {
                  Swal.fire({
                    title: "Incorrect Password",
                    text: "The password that you've entered is incorrect.Please try again.",
                    showConfirmButton: false,
                    timer: 3000
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
        <div>
            {
                isLogin ?(
                    <AdminHome/>
                ):(
                    <div>
                        <div>
                            <h2>Login</h2>
                        </div>
                        <div>
                            <form 
                            onSubmit={handleSubmit}
                            action="#"
                            method="POST">
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
                                        <label>Password</label>
                                        <input 
                                        type="password"
                                        autoComplete="off"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        />
                                        {touched.password && errors.password ? (
                                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                        ) : null}
                                    </div>
                                    <div className="text-sm">
                                        <Link to='/adminForgotPassword'  
                                        className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </Link>
                                    </div>
                                </div>

                                <div>
                                    <button>
                                        Login
                                    </button>
                                </div>
                            </form>
                            <p className="mt-10 text-center text-sm/6 text-gray-100">
                            Not a member?
                            <Link
                                to="/"
                                className="font-semibold text-orange-600 hover:text-orange-500"
                            >
                                Please Sign Up
                            </Link>
                            </p>

                        </div>

                    </div>
                )
                
            }
        </div>
    )

}

export {AdminLogin}