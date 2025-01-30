import * as Yup from 'yup';

export const SignUpValidationSchema = Yup.object({
    name :Yup.string().min(2).max(35).required("please enter your name"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 6 characters").required("Password is required"),
});
