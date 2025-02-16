import axios from "axios";
import { FilterIcon, SearchIcon } from "lucide-react"
import { useEffect, useState } from "react"

const ViewAllPatients = ({patients =[], setPatients})=>{
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
            const token = localStorage.getItem('authToken');

            if(!token){
            console.log("No Token Found")
            return
            }
            const fetchPatients = async () => {
                try {
                    const patientsResponse = await axios.get('http://localhost:2000/api/viewPatients',
                  { headers: { authorization: token } }
                );
                setPatients(patientsResponse.data.patients);
                } catch (error) {
                    console.log("Error fetching patients:", error);
                }
            };

            fetchPatients();   
    }, []); // Fetch once on component mount

    const searchPatient = searchTerm.toLowerCase() === '' 
    ? patients : 
    patients.filter(patient => patient.name.toLowerCase().includes(searchTerm));
        
    const handleSearchSubmit = (e)=>{
        e.preventDefault()
    }

    return (
        <div>
            <div className="flex max-w-screen-lg mx-auto  pt-7">
                <div className="flex flex-col max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] w-full">
                    <h1 className="text-3xl font-semibold">Patient List</h1>
                    <form 
                    className="relative w-64" 
                    onSubmit={handleSearchSubmit}>
                        <SearchIcon className="absolute left-2 top-2.5 h-5 w-5 text-gray-500"/>
                        <input 
                        type="text"
                        placeholder="Search patients..."
                        value={searchTerm}
                        onChange={(e)=>setSearchTerm(e.target.value)}
                        className="pl-8 pr-4 py-2 w-full border rounded-md shadow-md"
                        />
                    </form>
                    
                </div>
                 {/* filter div */}
            </div>

            <div className="lg:px-20">
                <table className="w-full text-sm text-left mt-10">
                    <thead className="text-gray-100 uppercase bg-blue-800">
                        <tr className="border-b">
                            <th className="px-6 py-3">SI.No</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Age</th>
                            <th className="px-6 py-3">Gender</th>
                            <th className="px-6 py-3">Contact</th>
                            <th className="px-6 py-3">Medical History</th>
                            <th className="px-6 py-3">Feedback</th>
                            <th className="px-6 py-3">Payment</th>
                            <th className="px-6 py-3">Chat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchPatient.length>0 ?(
                            searchPatient?.map((patient,index)=>(
                                <tr key={patient._id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-3">{index + 1}</td>
                                    <td className="px-6 py-3">{patient.name}</td>
                                    <td className="px-6 py-3">{patient.age}</td>
                                    <td className="px-6 py-3">{patient.gender}</td>
                                    <td className="px-6 py-3">{patient.phone}</td>
                                    <td className="px-6 py-3">{patient.medicalHistory}</td>
                                    <td className="px-6 py-3">{patient.feedbackreview}</td>
                                    <td className="px-6 py-3">{patient.payment}</td>
                                    <td className="px-6 py-3">{patient.chat}</td>
                                </tr>
                            ))
                        ):(
                            <p colSpan="9" className="text-center p-4">
                                No patients found
                            </p>
                        )
                        }
                        
                    </tbody>
                </table>
            </div>


        </div>
    )

} 
export { ViewAllPatients }