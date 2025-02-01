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
        <div className="flex bg-gradient-to-r from-pink-200 to-pink-300 min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8 ">
            <div className="border  py-12 px-20 bg-white rounded-2xl drop-shadow-lg">
                <div className="pb-7 sm:max-auto sm:w-full sm:max-w-sm ">
                    <h2 className="font-bold font-sans  text-3xl pb-5">Create a new account</h2>
                </div>

                <div >
                    <form onSubmit={handleSubmit} action="#" method="POST">
                        <div>
                            <div className="flex flex-col">
                                <label>Full Name</label>
                                <input 
                                type="text"
                                autoComplete="off"
                                autoSave="off"
                                name="adminName"
                                value={values.adminName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                className="block w-full rounded-md mt-2  bg-pink-100 px-3 py-2.5 focus:outline-pink-400 focus:outline text-base  border-slate-400 text-gray-900  placeholder:text-gray-800 focus:outline focus:outline-none sm:text-sm/6"
                                />

                                {touched.adminName && errors.adminName ? (
                                    <p className="text-red-500 text-sm mt-1">{errors.adminName}</p>
                                ) : null}
                            </div>
                            <div className="flex flex-col">
                                <label className="mt-5">Email</label>
                                <input
                                type="email"
                                autoComplete="off"
                                autoSave="off"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                className="block w-full rounded-md mt-2  bg-pink-100 px-3 py-2.5 focus:outline-pink-400 focus:outline text-base  border-slate-400 text-gray-900  placeholder:text-gray-800 focus:outline focus:outline-none sm:text-sm/6"
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
                                autoSave="off"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                className="block w-full rounded-md mt-2 bg-pink-100 px-3 py-2.5 focus:outline-pink-400 focus:outline text-base  border-slate-400 text-gray-900  placeholder:text-gray-400 focus:outline focus:outline-none sm:text-sm/6"
                            />
                            {touched.password && errors.password ? (
                                <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                                </p>
                            ) : null}
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                autoSave="off"
                                className="mt-9 bg-pink-500  px-28 text-white mb-3  py-2 rounded-3xl"
                            >
                                Register
                            </button>
        
                        </div>
                    </form>
                    <p className="flex justify-center">
                    Already have an account ?
                    <Link
                        to="/login"
                        className="text-red-600 ms-1 tracking-tight hover:text-blue-800 hover:underline"
                    >

                        sign In now
                    </Link>
                    </p>
                </div>
           </div>
        </div>
        </>
    )
}

export {AdminSignUp}