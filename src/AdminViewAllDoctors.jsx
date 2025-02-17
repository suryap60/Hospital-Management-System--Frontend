import axios from 'axios';
import { SearchIcon, Stethoscope } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const AdminViewAllDoctors = ({doctors = [], setDoctors}) => {
        const [doctorsFilter, setDoctorsFilter] = useState('All') 
        const [searchTerm, setSearchTerm] = useState('')   
    
    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if(!token){
        console.log("No Token Found")
        return
        }
        const fetchDoctors = async () => {
            try {
                const doctorsResponse = await axios.get('http://localhost:2000/api/adminViewAllDoctors',
                    {headers: { authorization: token }}
                )
                setDoctors(doctorsResponse.data.doctors)
            } catch (error) {
                console.log("Error fetching patients:", error);
            }
        };

        fetchDoctors();   
    }, []); // Fetch once on component mount

    const filteredDoctors = doctors
        .filter((doctor)=>
            doctorsFilter === 'All' || doctor.specialty === doctorsFilter)

        .filter((doctor)=>
            searchTerm.toLowerCase() === '' 
        ? doctor : 
         doctor.fullName.toLowerCase().includes(searchTerm))

    const handleSearchSubmit = (e)=>{
        e.preventDefault()
    }

    return(
        <div className="max-w-screen-lg mx-auto px-4 pt-4 ">
            <div className="flex justify-between flex-col">
                <h1 className="font-semibold text-3xl md:text-3xl">
                    All Dcotors
                </h1>

               <div className="flex pt-10">
                    <form 
                    className="relative w-64" 
                    onSubmit={handleSearchSubmit}>
                        <SearchIcon className="absolute left-2 top-2.5 h-5 w-5 text-gray-500"/>
                        <input 
                        type="text"
                        placeholder="Search Doctors..."
                        value={searchTerm}
                        onChange={(e)=>setSearchTerm(e.target.value)}
                        className="pl-8 pr-4 py-2 w-full border rounded-md shadow-md"
                        />
                    </form>
                    <div className='flex'>
                        <Stethoscope className="h-10 w-8 me-2 ms-3 text-blue-900"/>
                        <select 
                            className="bg-blue-500 text-white rounded-md px-2 py-2"
                            value={doctorsFilter}
                            onChange={(e)=>setDoctorsFilter(e.target.value)}
                        >
                            <option value="All">All Doctors</option>
                            <option value="Cardiology">Cardiology</option>
                            <option value="Dermatology">Dermatology</option>
                            <option value="Neurology">Neurology</option>
                            <option value="Pediatrics">Pediatrics</option>
                            <option value="Orthopedics">Orthopedics</option>
                        </select>
                    </div>
                </div>
                
            </div>

            <div className="mt-4">
                {filteredDoctors.length >0 ? (
                    <div className="shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left ">
                            <thead className="uppercase bg-blue-800 text-white">
                            <tr>
                                <th className="px-6 py-3">SI.No</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Specialty</th>
                                <th className="px-6 py-3">experiance</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredDoctors?.map((doctor,index) => (
                                <tr key={doctor._id } className="bg-white border-b  dark:border-cyan-700 border-gray-200 hover:bg-blue-50 ">
                                    {/* Assuming `d.id` is a unique identifier */}
                                    <td className="px-6 py-3">{index + 1}</td>
                                    <td className="px-6 py-3">Dr. {doctor.fullName}</td>
                                    <td className="px-6 py-3">{doctor.specialty}</td>
                                    <td className="px-6 py-3">{doctor.experiance}</td>
                                    <td className="px-6 py-3">{doctor.email}</td>
                                    <td className="px-6 py-3">{doctor.phone}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ):( 
                <p colSpan="9" className="text-center p-4">No Doctor Available</p>
                    )}
            </div>

        </div>
    )
}

export  { AdminViewAllDoctors }