import *as yup from 'yup'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/;


const ValidationForgotPasswordSchema = yup.object({
    email:yup.string().email('*Please Enter a Valid Email').matches(emailPattern,{message:"*Please Enter a Valid Email"}).required("*Please Enter Your Email"),
    newPassword:yup.string().matches(passwordPattern,{message:"*Please Enter a Valid Password"}).required("*Please Enter Your password")
})

export {ValidationForgotPasswordSchema}