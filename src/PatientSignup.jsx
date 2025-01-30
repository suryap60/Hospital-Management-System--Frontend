import "./App.css";
import axios from "axios";
import { useNavigate ,Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { SignUpValidationSchema } from "./schema/SignUpValidationSchema";

const PatientSignup = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "",
  };

  const { values, handleChange, handleSubmit, handleBlur, errors, touched, setFieldError } = useFormik({
    initialValues,
    validationSchema: SignUpValidationSchema,
    onSubmit: async (values, action) => {
      try {
        await axios.post("http://localhost:2000/api/register", values);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Signup successfully",
          showConfirmButton: false,
          timer: 4000,
        });
        navigate("/login");
        action.resetForm();
      } catch (error) {
        if (error.response?.status === 409) {
          setFieldError("email", "This email is already registered");
        }
      }
    },
  });

  return (
    <div className="max-w-md mx-auto p-8 bg-gradient-to-r from-pink-100 to-purple-100 shadow-xl rounded-lg font-amore">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {touched.name && errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {touched.email && errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {touched.password && errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {touched.phone && errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium text-gray-600">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={values.age}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {touched.age && errors.age && <p className="text-red-500 text-xs">{errors.age}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="gender" className="block text-sm font-medium text-gray-600">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={values.gender}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {touched.gender && errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-pink-300 text-white font-semibold rounded-md hover:bg-pink-400 transition"
        >
          Signup
        </button>
      </form>

      <p className="text-center mt-4 text-gray-600">
        Already Have an account?{" "}
        <Link to="/login" className="text-yellow-400 hover:underline">Login</Link>
      </p>
    </div>
  );
};

export default PatientSignup;
