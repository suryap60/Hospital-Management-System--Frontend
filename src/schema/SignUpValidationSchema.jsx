import * as Yup from "yup";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/;
const mobilNumberPattern = /^\d{10}$/;

export const SignUpValidationSchema = Yup.object({
  name: Yup.string().min(4).max(25).required("*Please Enter Your Name"),
  email: Yup.string()
    .matches(emailPattern, { message: "*Please Enter a Valid Email" })
    .required("*Please Enter Your email"),
  password: Yup.string()
    .matches(passwordPattern, { message: "*Please Enter a Valid Password" })
    .required("*Please Enter Your password"),
  phone: Yup.string()
    .matches(mobilNumberPattern, { message: "*Enter a Valid 10-digit Number" })
    .required("*Please Enter Your mobile number"),
});
