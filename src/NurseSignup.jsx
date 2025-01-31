import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { SignUpValidationSchema } from "./schema/SignUpValidationSchema";

const NurseSignup = () => {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState("");

  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    available: false,
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => setProfilePicture(reader.result); // Convert image to Base64
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
    <div className="max-w-md mx-auto p-8 bg-gradient-to-r from-pink-100 to-purple-100 shadow-xl rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>

      <form onSubmit={handleSubmit}>
        {["name", "email", "password", "phone"].map((field) => (
          <div key={field} className="mb-4">
            <label htmlFor={field} className="block text-sm font-medium text-gray-600">
              {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>
            <input
              type={field === "password" ? "password" : "text"}
              id={field}
              name={field}
              value={values[field]}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
            />
            {touched[field] && errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
          </div>
        ))}

        <div className="mb-4">
          <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-600">Profile Picture:</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="available"
            name="available"
            checked={values.available}
            onChange={handleChange}
            className="mr-2"
          />
          <label htmlFor="available" className="text-sm text-gray-600">Available for work?</label>
        </div>

        <button type="submit" className="w-full py-3 bg-pink-300 text-white font-semibold rounded-md hover:bg-pink-400 transition">
          Signup
        </button>
      </form>

      <p className="text-center mt-4 text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-yellow-400 hover:underline">Login</Link>
      </p>
    </div>
  );
};

export default NurseSignup;
