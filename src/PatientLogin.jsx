import './App.css';
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from 'react-router-dom';
import { LoginValidationSchema } from './schema/LoginValidationSchema';


const PatientLogin = () => {
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
    validationSchema:LoginValidationSchema,
    onSubmit: async (values, action) => {
      try {
        const response = await axios.post("http://localhost:2000/api/login", values);
        
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
          navigate('/home');
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
    <div className="max-w-md mx-auto p-8 bg-gradient-to-r from-pink-100 to-purple-100 shadow-xl rounded-lg font-amore">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email:</label>
          <input
            type="email"
            placeholder="Enter valid email"
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
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password:</label>
          <input
            type="password"
            placeholder="Enter valid password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.password && touched.password && <div className="text-red-500 text-sm">{errors.password}</div>}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-purple-300 text-white font-semibold rounded-md hover:bg-purple-400 transition"
        >
          Login
        </button>
      </form>

      <div className="text-center mt-4 text-gray-600">
        <Link to="/forgotpassword" className="text-yellow-400 hover:underline">Forgot Password?</Link>
      </div>

      <p className="text-center mt-4 text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="text-yellow-400 hover:underline">Sign Up</Link>
      </p>
    </div>
  );
};

export default PatientLogin;
