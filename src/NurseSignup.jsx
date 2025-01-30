import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { SignUpValidationSchema } from "./schema/SignUpValidationSchema";


const NurseSignup = () => {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "",
    available: false,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: SignUpValidationSchema,
    onSubmit: async (values, { resetForm, setFieldError }) => {
      try {
        const formData = new FormData();
        Object.entries(values).forEach(([key, value]) => formData.append(key, value));
        if (profilePicture) formData.append("profilePicture", profilePicture);

        await axios.post("http://localhost:2000/api/nurseregister", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        Swal.fire({ icon: "success", title: "Signup Successful!", timer: 4000, showConfirmButton: false });

        navigate("/nurselogin");
        resetForm();
        setProfilePicture(null);
      } catch (error) {
        error.response?.status === 409
          ? setFieldError("email", "This email is already registered")
          : Swal.fire({ icon: "error", title: "Signup Failed!", text: error.response?.data?.message || "Something went wrong!" });
      }
    },
  });

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } = formik;

  const renderInput = (label, type, name) => (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-600">{label}:</label>
      <input
        type={type}
        id={name}
        name={name}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
      />
      {touched[name] && errors[name] && <p className="text-red-500 text-xs">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="max-w-md mx-auto p-8 bg-gradient-to-r from-pink-100 to-purple-100 shadow-xl rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {renderInput("Name", "text", "name")}
        {renderInput("Email", "email", "email")}
        {renderInput("Password", "password", "password")}
        {renderInput("Phone", "text", "phone")}
        {renderInput("Age", "number", "age")}

        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-600">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={values.gender}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {touched.gender && errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-600">Profile Picture:</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            onChange={(e) => setProfilePicture(e.target.files[0])}
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
