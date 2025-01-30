import './App.css'
import PatientLogin from './PatientLogin'
import PatientSignup from './PatientSignup'
import cors from 'cors'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import React from 'react'
import Home from './Home'
import {ForgotPassword} from './ForgotPassword'
import NurseLogin from './NurseLogin'
import NurseSignup from './NurseSignup'
import NurseForgotPassword from './NurseForgotPassword'

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
    
      <Route path='/login' element={<PatientLogin/>}></Route>
      <Route path="/register" element ={<PatientSignup/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/forgotpassword" element={<ForgotPassword/>}></Route>
      <Route path='/nurselogin' element={<NurseLogin/>}></Route>
      <Route path="/nurseregister" element ={<NurseSignup/>}></Route>
      <Route path="/nurseforgotpassword" element={<NurseForgotPassword/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
