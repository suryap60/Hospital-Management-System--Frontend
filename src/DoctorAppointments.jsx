import axios from "axios"

const DoctorAppointments = ({appointments = [],setAppointments}) =>{
    
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
            

                // console.log(udateAppointmentResponse.data)

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

    return(
        <div className="max-w-screen-lg mx-auto px-4 mt-10 mt-20">
            <h1 className="ps-6 font-semibold text-xl md:text-xl">
                Upcoming Appointments
            </h1>
            <div className="mt-4">
                {appointments.length >0 ? (
                    <div className="shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left ">
                            <thead className=" uppercase border-b">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Time</th>
                                <th className="px-6 py-3">Reason</th>
                                <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments?.map((appointment) => (
                                <tr key={appointment._id || appointment.patientId.email} className="bg-white border-b  dark:border-cyan-700 border-gray-200 hover:bg-blue-50 ">
                                    {/* Assuming `d.id` is a unique identifier */}
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
                <p>No Appointments Available</p>
                 )}
            </div>

        </div>
    )

}

export { DoctorAppointments }