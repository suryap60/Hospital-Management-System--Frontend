import axios from 'axios';
import { SearchIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'

const AdminViewAllNurses = ({nurses = [], setNurses}) => {
        const [searchTerm, setSearchTerm] = useState('')   
    
    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if(!token){
        console.log("No Token Found")
        return
        }
        const fetchNurses = async () => {
            try {
                const nursesReponse = await axios.get('http://localhost:2000/api/adminViewAllNurses',
                    { headers: { authorization: token }}
                )
                setNurses(nursesReponse.data.nurses)
            } catch (error) {
                console.log("Error fetching patients:", error);
            }
        };

        fetchNurses();   
    }, []); // Fetch once on component mount

    const searchNurse = nurses
        .filter((nurse)=>
            searchTerm.toLowerCase() === '' 
        ? nurse : 
         nurse.name.toLowerCase().includes(searchTerm))

    const handleSearchSubmit = (e)=>{
        e.preventDefault()
    }

    return(
        <div className="max-w-screen-lg mx-auto px-4 pt-4 ">
            <div className="flex justify-between flex-col">
                <h1 className="font-semibold text-3xl md:text-3xl">
                    All Nurses
                </h1>

                <form 
                className="relative w-80 mt-10" 
                onSubmit={handleSearchSubmit}>
                    <SearchIcon className="absolute left-2 top-2.5 h-5 w-5 text-gray-500"/>
                    <input 
                    type="text"
                    placeholder="Search Nurses..."
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    className="pl-8 pr-4 py-2 w-full border rounded-md shadow-md"
                    />
                </form>
                   
               
                
            </div>

            <div className="mt-4">
                {searchNurse.length >0 ? (
                    <div className="shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left ">
                            <thead className="uppercase bg-blue-800 text-white">
                            <tr>
                                <th className="px-6 py-3">SI.No</th>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Phone</th>
                                {/* <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">phone</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {searchNurse?.map((nurse,index) => (
                                <tr key={nurse._id } className="bg-white border-b  dark:border-cyan-700 border-gray-200 hover:bg-blue-50 ">
                                    {/* Assuming `d.id` is a unique identifier */}
                                    <td className="px-6 py-3">{index + 1}</td>
                                    <td className="px-6 py-3">{nurse.name}</td>
                                    <td className="px-6 py-3">{nurse.email}</td>
                                    <td className="px-6 py-3">{nurse.phone}</td>
                                    {/* <td className="px-6 py-3">{nurse.email}</td>
                                    <td className="px-6 py-3">{nurse.phone}</td> */}
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ):( 
                <p colSpan="9" className="text-center p-4">No Nurse Available</p>
                    )}
            </div>

        </div>
    )
}

export { AdminViewAllNurses }