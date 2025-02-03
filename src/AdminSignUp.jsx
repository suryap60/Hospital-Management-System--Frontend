import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom"
import { ValidationSchema } from "./assets/ValidationSchema";
import axios from "axios";
import Swal from 'sweetalert2'
import backgroundImage from './images/signup.jpeg'

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
        <div className="flex min-h-screen justify-center items-center px-6 py-12 lg:px-8 "
        style={{
            backgroundImage: `url(${backgroundImage})`,  // Correct path for the public folder
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
            <div 
            className="py-12 px-20 rounded-2xl drop-shadow-lg"
            style={{
                backgroundColor: "rgba(255, 255, 255, 0.6)", // Transparent white background for the form
                backdropFilter: "blur(10px)", // Blur effect on the background
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional shadow for the form
            }}
            >
                <div className="pb-7 sm:max-auto sm:w-full sm:max-w-sm ">
                    <h2 className="font-bold font-sans  text-3xl pb-5">Get Started as an Admin</h2>
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
                                className="block w-full rounded-md mt-2  bg-gray-100 px-3 py-2.5 focus:outline-blue-400 focus:outline text-base  border-slate-400 text-gray-900  placeholder:text-gray-800 focus:outline focus:outline-none sm:text-sm/6"
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
                                className="block w-full rounded-md mt-2  bg-gray-100 px-3 py-2.5 focus:outline-blue-400 focus:outline text-base  border-slate-400 text-gray-900  placeholder:text-gray-800 focus:outline focus:outline-none sm:text-sm/6"
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
                                className="block w-full rounded-md mt-2 bg-gray-100 px-3 py-2.5 focus:outline-blue-400 focus:outline text-base  border-slate-400 text-gray-900  placeholder:text-gray-400 focus:outline focus:outline-none sm:text-sm/6"
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
                                className="mt-9 bg-blue-500  px-28 text-white mb-3  py-2 rounded-3xl"
                            >
                                Register
                            </button>
        
                        </div>
                    </form>
                    <p className="flex justify-center">
                    Already have an account ?
                    <Link
                        to="/login"
                        className="text-red-500 ms-1 tracking-tight hover:text-blue-800 hover:underline"
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