import { ForgotPassword } from './AdminForgotPassword.jsx'
import { AdminHome } from './AdminHome.jsx'
import { AdminLogin } from './AdminLogin.jsx'
import { AdminSignUp } from './AdminSignUp.jsx'
import './App.css'
import { BrowserRouter as Router ,Routes, Route } from 'react-router-dom'
import { RegisterDoctor } from './DoctorRegister.jsx'
import { LoginDoctor } from './DoctorLogin.jsx'
import { DoctorHome } from './DoctorHome.jsx'
import { DoctorForgotPassword } from './DoctorForgotPassword.jsx'
import PatientLogin from './PatientLogin.jsx'
import PatientSignup from './PatientSignup.jsx'
import Home from './Home.jsx'
import {ForgotPassword} from './ForgotPassword.jsx'
import NurseLogin from './NurseLogin.jsx'
import NurseSignup from './NurseSignup.jsx'
import NurseForgotPassword from './NurseForgotPassword.jsx'
function App() {
  

  return (
    <>
      <div>
        <Router>
          <Routes>
            {/* Admin Routes */}
            <Route path='/' element={<AdminSignUp/>}/>
            <Route path='/login' element={<AdminLogin/>}/>
            <Route path='/adminHome' element={<AdminHome/>}/>
            <Route path='/adminForgotPassword' element={<ForgotPassword/>}/>

            {/* Doctors Routes */}
            <Route path='/registerDoctor' element={<RegisterDoctor/>}/>
            <Route path='/loginDoctor' element={<LoginDoctor/>}/>
            <Route path='/homeDoctor' element={<DoctorHome/>}/>
            <Route path='/forgotPasswordDoctor' element={<DoctorForgotPassword/>}/>


            <Route path='/login' element={<PatientLogin/>}></Route>
            <Route path="/register" element ={<PatientSignup/>}></Route>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/forgotpassword" element={<ForgotPassword/>}></Route>
            <Route path='/nurselogin' element={<NurseLogin/>}></Route>
            <Route path="/nurseregister" element ={<NurseSignup/>}></Route>
            <Route path="/nurseforgotpassword" element={<NurseForgotPassword/>}></Route>
          </Routes>
        </Router>

      </div>
        
    </>
  )
}

export default App
