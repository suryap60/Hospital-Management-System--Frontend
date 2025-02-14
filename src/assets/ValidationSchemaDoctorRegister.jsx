import *as yup from 'yup'

const emailPattern =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,20}$/;
const mobilNumberPattern = /^\d{10}$/ ;

const DoctorRegisterValidationSchema = yup.object({
        fullName:yup.string().min(4).max(25).required("*Please Enter Your Name"),
        email:yup.string().matches(emailPattern,{message:"*Please Enter a Valid Email"}).required("*Please Enter Your email"),
        password:yup.string().matches(passwordPattern,{message:"*Please Enter a Valid Password"}).required("*Please Enter Your password"),
        phone:yup.string().matches(mobilNumberPattern,{message:"*Enter a Valid 10-digit Number"}).required("*Please Enter Your mobile number"),
        specialty:yup.string().oneOf(["Cardiology","Dermatology","Neurology","Pediatrics","Orthopedics"],{message:"*Please Select a valid specialty"}).required("*Please Enter Your specialty"),
        experiance:yup.string().oneOf(["1","2","3","4","5","6","7","8","9","10"],{message:"*Please Select a valid Experiance"}).required("*Please Enter Your experiance")
})

export { DoctorRegisterValidationSchema }