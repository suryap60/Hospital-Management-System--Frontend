import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom"
import { ValidationSchema } from "./assets/ValidationSchema";
import axios from "axios";
import Swal from 'sweetalert2'

const AdminSignUp = ()=>{

    const navigation = useNavigate()

    const initialValues = {
        adminName: "",
        email: "",
        password: "",
      };

      const onSubmit = async(values,action)=>{
        try{
            await axios.post(
                "http://localhost:2000/api/register",
                values
              );

              action.resetForm();
              Swal.fire({
                title: "Success!",
                text: " Congratulation,your account has been successfully created",
                icon: "success"
              });
              navigation('/login')
        }
        catch(error){
            if(error.response && error.response.status == 409){
                // const errorMessage = error.response.data.message || "*This email is already registered";
                // setFieldError("email", errorMessage);
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
        touched,
        setFieldError
     } = useFormik({
        initialValues:initialValues,
        validationSchema:ValidationSchema,
        onSubmit:onSubmit

     })



    return(
        <>
        <div>
            <div>
                <h2>Create a New account</h2>
            </div>

            <div>
                <form onSubmit={handleSubmit} action="#" method="POST">
                    <div>
                        <div>
                            <label>Full Name</label>
                            <input 
                            type="text"
                            placeholder="Enter Your name"
                            autoComplete="off"
                            autoSave="off"
                            name="adminName"
                            value={values.adminName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className="block w-full rounded-md bg-white px-3 py-2.5 focus:outline-green-600 focus:outline text-base  border-slate-400 text-gray-900  placeholder:text-gray-400 focus:outline mt-7 focus:outline-none sm:text-sm/6"
                            />

                            {touched.adminName && errors.adminName ? (
                                <p className="text-red-500 text-sm mt-1">{errors.adminName}</p>
                            ) : null}
                        </div>
                        <div>
                            <label>Email</label>
                            <input
                            type="email"
                            placeholder="Enter Valid Email"
                            autoComplete="off"
                            autoSave="off"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className="block w-full rounded-md bg-white px-3 py-2.5 focus:outline-green-600 focus:outline text-base  border-slate-400 text-gray-900  placeholder:text-gray-400 focus:outline mt-7 focus:outline-none sm:text-sm/6"
                        />

                        {touched.email && errors.email ? (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        ) : null}
                        </div>
                        <div>
                            <label>Password</label>
                            <input 
                            type="password"
                            placeholder="Enter valid password"
                            autoComplete="off"
                            autoSave="off"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className="block w-full rounded-md mt-7 bg-white px-3 py-2.5 focus:outline-green-600 focus:outline text-base  border-slate-400 text-gray-900  placeholder:text-gray-400 focus:outline focus:outline-none sm:text-sm/6"
                          />
                          {touched.password && errors.password ? (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.password}
                            </p>
                          ) : null}
                        </div>
                    </div>
                    <div>
                        <button
                            autoSave="off"
                        >
                            Register
                        </button>
    
                    </div>
                </form>
                <p>
                Already have an account ?
                <Link
                    to="/login"
                >

                    Sign In now
                </Link>
                </p>
            </div>
        </div>
        </>
    )
}

export {AdminSignUp}