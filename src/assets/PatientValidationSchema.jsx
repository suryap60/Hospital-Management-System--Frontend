import * as yup from 'yup';

const emailPattern =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/;
const mobilNumberPattern = /^\d{10}$/ ;

const SignUpValidationSchema = yup.object({
    name:yup.string().min(4).max(25).required("*Please Enter Your Name"),
    email:yup.string().matches(emailPattern,{message:"*Please Enter a Valid Email"}).required("*Please Enter Your email"),
    password:yup.string().matches(passwordPattern,{message:"*Please Enter a Valid Password"}).required("*Please Enter Your password"),
    phone:yup.string().matches(mobilNumberPattern,{message:"*Enter a Valid 10-digit Number"}).required("*Please Enter Your mobile number"),
});

export {SignUpValidationSchema}