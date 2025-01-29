import { ForgotPassword } from './AdminForgotPassword.jsx'
import { AdminHome } from './AdminHome.jsx'
import { AdminLogin } from './AdminLogin.jsx'
import { AdminSignUp } from './AdminSignUp.jsx'
import './App.css'
import { BrowserRouter as Router ,Routes, Route } from 'react-router-dom'


function App() {
  

  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<AdminSignUp/>}/>
            <Route path='/login' element={<AdminLogin/>}/>
            <Route path='/adminHome' element={<AdminHome/>}/>
            <Route path='/adminForgotPassword' element={<ForgotPassword/>}/>
          </Routes>
        </Router>

      </div>
        
    </>
  )
}

export default App
