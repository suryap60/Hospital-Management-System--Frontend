import axios from "axios";
import { Activity, X, Menu, UserCircle ,LogOut, Calendar, User } from "lucide-react";
import { useEffect, useState } from "react"

const DoctorHome  = () =>{

  const [isMenuOpen, setIsMenuOpen] = useState(false) ;
  const [doctorProfile, setDoctorProfile] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([])
  const [isLogout, setIsLogout] = useState(false)
  const [stats, setStats] = useState([])
  const [activePage,setActivePage] = useState('dashboard')

  const navigation = [
    { name: 'Dashboard', icon:Activity , id:'dashboard'},
    { name: 'Appointments', icon:Calendar , id:'appointments'},
    { name: 'Patients', icon:User , id:'patients'},
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
        console.log(profileResponse.data.doctor)

        //fetch patients
        const appointmentsResponse = await axios.get('http://localhost:2000/api/viewPatientAppointment',
          { headers: { authorization: token } }
        );
        setAppointments(appointmentsResponse.data.appointment)
        console.log(appointmentsResponse.data.appointment)

        //fetch patients
        const patientsResponse = await axios.get('http://localhost:2000/api/viewPatients',
          { headers: { authorization: token } }
        );
        setPatients(patientsResponse.data.patients )
        console.log(patientsResponse.data.patients )
      }
      catch(error){
        setError(error.response?.data?.message || 'An error occurred');
      }

    }
    fetchToken();

  },[]) 

  // Update stats when patients or appointments change
  useEffect(() => {
    setStats([
      { title: "Total Patients", value: patients.length, Icon: User },
      { title: "Total Appointments", value: appointments.length, Icon: Calendar },
    ]);
  }, [patients, appointments]);

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    window.location.href = '/loginDoctor'
  }

  


  return (
    <div className="h-screen flex">
    
      {/* sidebar */}
      <div className={`h-screen w-64 bg-white shadow fixed top-0 left-0
         ${isMenuOpen? 'translate-x-0 ' : '-translate-x-full'} lg:translate-x-0 lg:static lg:block transition-transform duration-200`}>
          <div className="h-20 flex items-center gap-4 ms-4 border-b">
              {doctorProfile?.profilePicture?(
                <img src={doctorProfile.profilePicture} 
                alt="Doctor Profile"
                className="w-12 h-12 rounded-full mb-2"
                 />):(
                  <UserCircle  className="w-12 h-12 text-gray-500 mb-2"/>
              )}
              <div className="flex flex-col">
              <p className="text-md font-bold text-gray-600">
                  Dr. {doctorProfile?.fullName}
              </p>
              <p className="text-gray-600">
                {doctorProfile.email}
              </p>
              </div>
          </div>
          
          <nav className="p-4">
              { navigation.map((item)=>(
                <button 
                key={item.id}
                 onClick={()=>{
                  setActivePage(item.id)
                  setIsMenuOpen(false)
                 }}
                 className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md mb-2
                  ${activePage == item.id? "bg-blue-50" : "text-gray-600 hover:bg-blue-50"} `}
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

      <div className="flex-1 p-6 relative ml-64">
          {/* Menu Button */}
        <button
          className="fixed top-4 right-4 z-50 p-2 lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
        </button>
      </div>

      {/* rendering -dashboard status */}
      <div className="w-full max-w-6xl mx-auto me-96 px-4 md:px-6 lg:px-8">
      <div className="grid grid-col-1 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
        { stats?.map((stat, index)=>(
          <div key={index} className="bg-white h-48 p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            </div>
          </div>
      ))}
      </div>
      </div>
      



      
       
    </div>
 
  )
}

export { DoctorHome }