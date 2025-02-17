import axios from "axios";
import { Activity, X, Menu, UserCircle ,LogOut, CalendarDays ,CalendarHeart, HeartPulse, Accessibility, Users } from "lucide-react";
import { useEffect, useState } from "react"
import { DoctorDashboard } from "./DoctorDashboard";
import { DoctorAppointments } from "./DoctorAppointments";
import { ViewAllPatients } from "./DoctorViewPatients";
import { DoctorProfile } from "./DoctorProfile";


const DoctorHome  = () =>{

  const [isMenuOpen, setIsMenuOpen] = useState(false) ;
  const [doctorProfile, setDoctorProfile] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([])
  const [stats, setStats] = useState([])
  const [activePage,setActivePage] = useState('dashboard')

  const navigation = [
    { name: 'Dashboard', icon:Activity , id:'dashboard'},
    { name: 'Appointments', icon:CalendarHeart, id:'appointments'},
    { name: 'Patients', icon:Accessibility , id:'patients'},
  ]
  

  //fetch initial data
  useEffect(() => {
    const fetchToken = async()=>{
      const token = localStorage.getItem('authToken');

      if(!token){
        window.location.href= '/loginDoctor'
      }
      try{
        //fetch profile
        const profileResponse = await axios.get('http://localhost:2000/api/viewDoctorProfile',
          { headers: { authorization: token } }
        );
        setDoctorProfile(profileResponse.data.doctor)
        // console.log(profileResponse.data.doctor)

        //fetch patients
        const appointmentsResponse = await axios.get('http://localhost:2000/api/viewPatientAppointment',
          { headers: { authorization: token } }
        );
        setAppointments(appointmentsResponse.data.appointment)

        //fetch patients
        const patientsResponse = await axios.get('http://localhost:2000/api/viewPatients',
          { headers: { authorization: token } }
        );
        setPatients(patientsResponse.data.patients);
        
      }
      catch(error){
        console.log(error)
      }

    }
    fetchToken();

  },[]) 

  // Update stats when patients or appointments change
  useEffect(() => {
    setStats([
      { title: "Total Patients", value: patients.length, icon: Users },
      { title: "Total Appointments", value: appointments.length, icon: CalendarDays  },
    ]);
  }, [patients, appointments]);

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    window.location.href = '/loginDoctor'
  }


  return (
    <div className="h-screen overflow-y-auto flex">
    
      {/* sidebar */}
      <div className={`h-screen w-64 lg:w-1/4 md:w-56  bg-white shadow fixed top-0 left-0  overflow-y-auto 
         ${isMenuOpen? 'translate-x-0 ' : '-translate-x-full'} lg:translate-x-0 lg:static  transition-transform duration-200`}>

          {/* doctor profile */}
          <div 
            className="h-24 flex cursor-pointer items-center gap-4 ms-4 border-b border-blue-800"
            onClick={()=>setActivePage("profile")}
          >
              {doctorProfile?.profilePicture?(
                <img src={doctorProfile.profilePicture} 
                alt="Doctor Profile"
                className="w-12 h-12 rounded-full mb-2"
                 />):(
                  <UserCircle  className="w-12 h-12 text-blue-500 mb-2"/>
              )}
              <div className="flex flex-col">
              <p className="text-md font-bold text-blue-900">
                  Dr. {doctorProfile?.fullName}
              </p>
              <p className="text-blue-900">
                {doctorProfile.email}
              </p>
              </div>
          </div>
          
          {/* side navigation */}
          <nav className="p-4">
              { navigation.map((item)=>(
                <button 
                key={item.id}
                 onClick={()=>{
                  setActivePage(item.id)
                  setIsMenuOpen(false)
                 }}
                 className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md mb-2  hover:text-gray-700
                  ${activePage == item.id? "bg-blue-50" : "text-blue-700 hover:bg-blue-50"} `}
                >
                  <item.icon className="h-5 w-5"/>
                  <span>{item.name}</span>
                </button>
              ))}
              {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-gray-10 rounded-md"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </nav>

      </div>

      {/* main content */}
      <div className="flex-initial w-full">

         {/* Header */}
        <header className="bg-white py-6 px-6 flex items-center shadow-md w-full z-40 ">
          <h1 className="text-2xl text-blue-700 font-bold">HealthCare</h1>
          <HeartPulse className="text-red-500"/>
        </header>
          {/* Menu Button */}
        <button
          className="fixed top-4 right-4 z-50 p-2 lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6 text-blue-900" /> : <Menu className="h-6 w-6 text-blue-900 color" />}
        </button>
      

        {/* rendering -dashboard status */}
        <div className="w-full mx-auto px-4 md:px-6 ">

          { activePage == "dashboard" && 
            (
              <>
              {/* Welcome Section - Only for Dashboard */}
              <div className="text-left mb-6 pt-20 lg:ps-28 ps-8">
                <div className="flex">
                  <h1 className="text-3xl  font-semibold text-gray-800">Welcome,</h1>
                  <h1 className="text-3xl  font-bold text-blue-900">Dr. {doctorProfile?.fullName}!</h1>
                </div>
                <p className="py-2 text-lg">Easily manage your schedule, consult with patients, and stay on top of your <br /> appointments with our seamless platform.</p>
              </div>
        
              {/* Dashboard Content */}
              <DoctorDashboard stats={stats} />
            </>
          )}

          { activePage == 'appointments' && 
          <DoctorAppointments appointments={appointments} setAppointments={setAppointments}/>}
          { activePage == 'patients' && <ViewAllPatients patients={patients} setPatients={setPatients}/> }
          { activePage == 'profile' && <DoctorProfile doctorProfile={doctorProfile} setDoctorProfile={setDoctorProfile}/>}


        </div>
      </div>
  
    </div>
 
  )
}

export { DoctorHome }