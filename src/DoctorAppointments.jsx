import axios from "axios"
import dayjs from "dayjs"
import { CalendarDays } from "lucide-react"
import { useState } from "react"

const DoctorAppointments = ({appointments = [],setAppointments}) =>{
    const [appointmentFilter, setAppointmentFilter] = useState('All')    
    const [dateFilter, setDateFilter] = useState('All')
    
    const handleUpdateStatus = async(appointmentId,newStatus)=>{
        try{
            const token = localStorage.getItem('authToken')

            if (!token) {
                console.error("No auth token found");
                return;
            }
            await axios.put(
                `http://localhost:2000/api/updateAppointment/${appointmentId}`,
                {status: newStatus},
                {headers:{
                    authorization:token
                }},)
            
            setAppointments((app)=>(
                app.map((appointment) =>
                    appointment._id === appointmentId? 
                        { ...appointment, status: newStatus } 
                        : appointment )
            ))
        }
        catch(error){
            console.log('error',error)
        }
    }

     // Date-based filtering function
    const filterByDate = (appointment) => {
        const today = dayjs()
        const appointmentDate = dayjs(appointment.date)
        
        if (dateFilter == "Today"){
            return appointmentDate.isSame(today,'day');
        }else if (dateFilter === "This Week"){
            return appointmentDate.isSame(today,'week')
        }else if (dateFilter === "This Month"){
            return appointmentDate.isSame(today,"month")
        }
        return true; // If "All" is selected, show all appointments
    }

    const filteredAppointment = appointments
    .filter((appointment)=>
        appointmentFilter === 'All' || appointment.status === appointmentFilter)
    .filter(filterByDate); // Apply date filter


    return(
        <div className="max-w-screen-lg mx-auto px-4 mt-8 ">
            <div className="flex justify-between flex-col">
                <h1 className="font-semibold text-3xl md:text-3xl">
                    Upcoming Appointments
                </h1>
                <p className="py-1">Manage and track your scheduled appointments</p>
                <div className="flex gap-4 mt-10">
                    
                    <div className="flex">
                        <CalendarDays className="h-10 w-8 me-2 text-blue-900"/>
                        <select 
                            className="bg-blue-500 text-white rounded-md px-2 py-2"
                            value={dateFilter}
                            onChange={(e)=>setDateFilter(e.target.value)}
                        >
                            <option value="All">All Dates</option>
                            <option value="Today">Today</option>
                            <option value="This Week">This Week</option>
                            <option value="This Month">This Month</option>
                        </select>
                    </div>


                    <div className="flex">
                        <select 
                            className="bg-blue-500 text-white rounded-md px-2 py-2" 
                            value={appointmentFilter}
                            onChange={(e)=>setAppointmentFilter(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>

                </div>
            </div>

            <div className="mt-4">
                {filteredAppointment.length >0 ? (
                    <div className="shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left ">
                            <thead className="uppercase bg-blue-800 text-white">
                            <tr>
                                <th className="px-6 py-3">SI.No</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Time</th>
                                <th className="px-6 py-3">Reason</th>
                                <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAppointment?.map((appointment,index) => (
                                <tr key={appointment._id || appointment.patientId.email} className="bg-white border-b  dark:border-cyan-700 border-gray-200 hover:bg-blue-50 ">
                                    {/* Assuming `d.id` is a unique identifier */}
                                    <td className="px-6 py-3">{index + 1}</td>
                                    <td className="px-6 py-3">{appointment.patientId?.name}</td>
                                    <td className="px-6 py-3">{appointment.date}</td>
                                    <td className="px-6 py-3">{appointment.time}</td>
                                    <td className="px-6 py-3">{appointment.reason}</td>
                                    <td className="px-6 py-3">
                                        <select 
                                        className={`px-2 py-1 rounded-full text-sm ${
                                            appointment.status === 'Pending' ? 'bg-blue-100 text-blue-800' :
                                            appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                            appointment.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}
                                        value={appointment.status} 
                                        onChange={(e)=> handleUpdateStatus(appointment._id,e.target.value)}
                                        id="">
                                            <option value="Pending">Pending</option>
                                            <option value="Confirmed">Confirmed</option>
                                            <option value="Cancelled">Cancelled</option>

                                        </select>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ):( 
                <p colSpan="9" className="text-center p-4">No Appointments Available</p>
                 )}
            </div>

        </div>
    )

}

export { DoctorAppointments }