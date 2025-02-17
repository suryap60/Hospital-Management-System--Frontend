import axios from "axios";
import { Accessibility, Activity, CalendarDays, CalendarHeart, HeartPulse, LogOut, Menu, Stethoscope, Syringe, UserCircle, X } from "lucide-react";
import { useEffect, useState } from "react"
import { AdminDashBoard } from "./AdminDashBoard";
import { AdminViewAllAppointments } from "./AdminViewAllAppointments";
import { AdminViewAllDoctors } from "./AdminViewAllDoctors";
import { AdminViewAllPatients } from "./AdminViewAllPatients";
import { AdminViewAllNurses } from "./AdminViewAllNurses";

const AdminHome = ()=>{
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [adminProfile, setAdminProfile] = useState({});
    const [doctors, setDoctors] = useState([]);;
    const [nurses, setNurses] = useState([]);
    const [patients, setPatients] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [stats, setStats] = useState([]);
    const [activePage, setActivePage] = useState('dashboard')

    const navigation = [
        { name:'Dashboard', icon: Activity, id:'dashboard'},
        { name:'Doctor', icon: Stethoscope, id:'doctors'},
        { name:'Patients', icon:Accessibility, id:'patients'},
        { name:'Nurses', icon: Syringe, id:'nurses'},
        { name:'Appointments', icon: CalendarHeart, id:'appointments'},
    ]
    
    // Fetch Initial data
    useEffect(()=>{
        const fetchData = async() =>{
            const token = localStorage.getItem('authToken');
            if(!token) {
                window.location.href = '/login'
            }

            try{
                //fetch profile
                const profileResponse = await axios.get('http://localhost:2000/api/viewAdminProfile',
                    {headers: { authorization: token}}
                );
                setAdminProfile(profileResponse.data.admin)

                //fetch doctors
                const doctorsResponse = await axios.get('http://localhost:2000/api/adminViewAllDoctors',
                    {headers: { authorization: token }}
                )
                setDoctors(doctorsResponse.data.doctors)
                console.log(doctorsResponse.data.doctors)

                // fetch nurses
                const nursesReponse = await axios.get('http://localhost:2000/api/adminViewAllNurses',
                    { headers: { authorization: token }}
                )
                setNurses(nursesReponse.data.nurses)

                //fetch patients 
                const patientsResponse = await axios.get('http://localhost:2000/api/adminViewAllPateints',
                    {headers : { authorization: token}}
                )
                setPatients(patientsResponse.data.patients)

                //fetch appointmnents 
                const appointmentsResponse = await axios.get('http://localhost:2000/api/adminViewAllAppointments',
                    { headers : { authorization : token}}
                )
                setAppointments(appointmentsResponse.data.formatedAppointment)
                console.log(appointmentsResponse.data.formatedAppointment)
            }catch(error){
                console.log(error)
            }

        }
        fetchData()
    },[])

    useEffect(()=>{
        setStats([
            {title:'Doctors', value:doctors.length, icon: Stethoscope},
            {title:'Nurses', value:nurses.length, icon: Syringe},
            {title:'Patients', value:patients.length, icon: Accessibility},
            {title:'Appointments', value:appointments.length, icon: CalendarDays},
        ])

    },[doctors, nurses, patients, appointments])

    const handleLogout = () => {
        localStorage.removeItem('authToken')
        window.location.href = '/login'
      }

    return(
        <div className="h-screen overflow-y-auto flex">
            {/* sidebar */}
            <div className={`h-screen w-64 lg:w-1/4 md:w-56  bg-white shadow fixed top-0 left-0  overflow-y-auto 
                ${isMenuOpen? 'translate-x-0 ' : '-translate-x-full'} lg:translate-x-0 lg:static  transition-transform duration-200`}>

                {/* admin profile */}
                <div 
                    className="h-24 flex cursor-pointer items-center gap-4 ms-4 border-b border-blue-800"
                    onClick={()=>setActivePage("profile")}
                >
                    {adminProfile?.profilePicture?(
                        <img src={adminProfile.profilePicture} 
                        alt="Doctor Profile"
                        className="w-12 h-12 rounded-full mb-2"
                        />):(
                        <UserCircle  className="w-12 h-12 text-blue-500 mb-2"/>
                    )}
                    <div className="flex flex-col">
                    <p className="text-md font-bold text-blue-900">
                        {adminProfile?.adminName}
                    </p>
                    <p className="text-blue-900">
                        {adminProfile.email}
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
                            <div className="text-left mb-6 pt-10 lg:ps-28 ps-8">
                                <div className="flex">
                                    <h1 className="text-3xl  font-semibold text-gray-800">Welcome,</h1>
                                    <h1 className="text-3xl  font-bold text-blue-900">{adminProfile?.adminName}!</h1>
                                </div>
                            <p className="py-2 text-lg">Easily manage doctors, patients, and appointments while ensuring smooth hospital operations. Stay in control of the system with real-time monitoring and efficient management tools at your fingertips.</p>
                            </div>

                            {/* Dashboard Content */}
                            <AdminDashBoard stats={stats}/>
                        </>
                    )}

                    { activePage == 'appointments' &&  
                    <AdminViewAllAppointments appointments={appointments} setAppointments={setAppointments}/>}
                    { activePage == 'doctors' && <AdminViewAllDoctors doctors={doctors} setDoctors={setDoctors}/> }
                    { activePage == 'patients' && <AdminViewAllPatients patients={patients} setPatients={setPatients}/> }
                    { activePage == 'nurses' && <AdminViewAllNurses nurses={nurses} setNurses={setNurses}/>}
                </div>
            </div>

        </div>
    )
}
export {AdminHome}