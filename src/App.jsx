import { ForgotPassword } from './AdminForgotPassword.jsx'
import { AdminHome } from './AdminHome.jsx'
import { AdminLogin } from './AdminLogin.jsx'
import { AdminSignUp } from './AdminSignUp.jsx'
import './App.css'
import { BrowserRouter as Router ,Routes, Route } from 'react-router-dom'
import { RegisterDoctor } from './DoctorRegister.jsx'
import { LoginDoctor } from './DoctorLogin.jsx'


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

          </Routes>
        </Router>

      </div>
        
    </>
  )
}

export default App
