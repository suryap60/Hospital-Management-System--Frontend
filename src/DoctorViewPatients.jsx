import axios from "axios";
import { FilterIcon, SearchIcon } from "lucide-react"
import { useEffect, useState } from "react"

const ViewAllPatients = ({patients =[], setPatients})=>{

    // const [searchTerm, setSearchTerm] = useState('')
    const [appointmentFilter, setAppointmentFilter] = useState('All')

    useEffect(() => {
            const token = localStorage.getItem('authToken');

            if(!token){
            console.log("No Token Found")
            return
            }

            fetchPatients(token);   
    }, []); // Fetch once on component mount

    const fetchPatients = async (token) => {
        try {
            const patientsResponse = await axios.get('http://localhost:2000/api/viewPatients',
          { headers: { authorization: token } }
        );
        setPatients(patientsResponse.data.patients);
        } catch (error) {
            console.log("Error fetching patients:", error);
        }
    };

    const filteredPatients = appointmentFilter === 'All' 
        ? patients 
        : patients.filter(patient => patient.appointment === appointmentFilter)

    return (
        <div>
            <div className="flex  justify-between max-w-screen-lg mx-auto  pt-7">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-semibold">Patient List</h1>
                    <div className="relative w-64">
                        <SearchIcon className="absolute left-2 top-2.5 h-5 w-5 text-gray-500"/>
                        <input 
                        type="text"
                        placeholder="Search patients..."
                        className="pl-8 pr-4 py-2 w-full border rounded-md shadow-md"
                        />
                    </div>
                    
                </div>
                 
                 <div className="flex items-center gap-2">
                    <FilterIcon className="h-10  w-8 "/>
                    <select 
                        className="border rounded-md px-2 py-2" 
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
            <div>
                <table className="w-full mt-16">
                    <thead className="text-gray-700 uppercase">
                        <tr className="border-b">
                            <th className="text-left p-4">Name</th>
                            <th className="text-left p-4">Age</th>
                            <th className="text-left p-4">Gender</th>
                            <th className="text-left p-4">Contact</th>
                            <th className="text-left p-4">Appointment Status</th>
                            <th className="text-left p-4">Medical History</th>
                            <th className="text-left p-4">Feedback</th>
                            <th className="text-left p-4">Payment</th>
                            <th className="text-left p-4">Chat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients && filteredPatients.length>0 ?(
                            filteredPatients?.map((patient)=>(
                                <tr key={patient._id || patient.email} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{patient.name}</td>
                                    <td className="p-4">{patient.age}</td>
                                    <td className="p-4">{patient.gender}</td>
                                    <td className="p-4">{patient.phone}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-sm ${
                                            patient.appointment === 'Pending' ? 'bg-blue-100 text-blue-800' :
                                            patient.appointment === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                            patient.appointment === 'Cancelled' ? 'bg-red-100 text-red-800' :
                                            patient.appointment === 'No-Show' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}

                                        >
                                        {patient.appointment}
                                        </span>
                                    </td>
                                    <td className="p-4">{patient.medicalHistory}</td>
                                    <td className="p-4">{patient.feedbackreview}</td>
                                    <td className="p-4">{patient.payment}</td>
                                    <td className="p-4">{patient.chat}</td>
                                </tr>
                            ))
                        ):(
                            <tr>
                                <td colSpan="9" className="text-center p-4">No patients found</td>
                            </tr>
                        )
                        }
                        
                    </tbody>
                </table>
            </div>


        </div>
    )

} 
export { ViewAllPatients }