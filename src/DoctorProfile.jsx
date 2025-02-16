import axios from "axios";
import { Briefcase, Mail, Phone, Stethoscope, UserSquare2 } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const DoctorProfile = ({ doctorProfile, setDoctorProfile }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState({})
  // const [newPassword, setNewPassword] = useState(""); 

  useEffect(()=>{
    const token = localStorage.getItem('authToken');

    if(!token){
    console.log("No Token Found")
    return
    }
    const fetchProfile = async () => {
      try{
        //fetch profile
        const profileResponse = await axios.get('http://localhost:2000/api/viewDoctorProfile',
          { headers: { authorization: token } }
        );
        setDoctorProfile(profileResponse.data.doctor)
        setEditedProfile(profileResponse.data.doctor)
      }catch(error){
        console.log("error:",error)
    }
  }
  fetchProfile();

  },[])

  const handleChange = (e)=>{
    setEditedProfile({...editedProfile,[e.target.name]: e.target.value})
  }

  const handleUpdate = async()=>{
    const token = localStorage.getItem('authToken');

    if(!token){
    console.log("No Token Found")
    return
    }
    // // Only add the password to the request if a new one is provided
    // const updatedData = { ...editedProfile };
    // if (newPassword) {
    //   updatedData.password = newPassword;
    // }


    try{
      const updateProfileResponse = await axios.put('http://localhost:2000/api/updateDoctorProfile',
        editedProfile, // Send the updated profile data in the body
        { headers: { authorization: token } }
      );
      setDoctorProfile(updateProfileResponse.data.doctor)
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: " Congratulation,your profile has been successfully Edited",
        showConfirmButton:false,
        timer:1500
          
      });
      setIsEditing(false)
      // setNewPassword(""); // Reset password field
    }catch(error){
      console.log("error",error)
    }
  }


  return (
    <div className="max-w-screen-lg mx-auto ">
        { isEditing == false ? (
          <div className="bg-blue-100 rounded-2xl px-6 py-6 mt-20 lg:flex md:flex border h-full">
            <div className="w-1/4 sm:w-full">
          {doctorProfile?.profilePicture ? (
            <img
              src={doctorProfile.profilePicture}
              alt="Doctor Profile"
              className="w-24 h-24 rounded-full mb-2"
            />
          ) : (
            <UserSquare2 className="w-full h-full text-gray-500 mb-2" />
          )}
        </div>
        <div className="px-10 w-3/4 py-24">
          <p className="text-5xl font-bold">Dr. {doctorProfile?.fullName}</p>
          <div className="py-4 text-xl">
            <div className="flex items-center gap-2 py-2">
                <Stethoscope className="w-8 h-8 text-gray-600" />
                <p className="text-lg">{doctorProfile?.specialty}</p>
            </div>
            <div className="flex items-center gap-2 py-2">
                <Briefcase className="w-8 h-8 text-gray-600" />
                <p className="text-lg">{doctorProfile?.experiance}+ years Experience</p>
            </div>
            <div className="flex items-center gap-2 py-2">
                <Mail className="w-8 h-8 text-gray-600" />
                <p className="text-lg">{doctorProfile?.email}</p>
            </div>
            <div className="flex items-center gap-2 py-2">
                <Phone className="w-8 h-8 text-gray-600" />
                <p className="text-lg">{doctorProfile?.phone}</p>
            </div>
            <div className="flex gap-4 mt-4">
              <button 
              className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              onClick={()=> setIsEditing(true)}
              >
                Edit
              </button>
              <button 
              className="w-full bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
          </div>
        ) 
        : (
          <div className="rounded-2xl w-full px-6 py-6 mt-20 lg:flex md:flex border h-full">
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-6">Edit Your Profile</h2>
              <div className="flex flex-col py-2">
                <label>Full Name</label>
                <input 
                type="text" 
                name="fullName" 
                value={editedProfile.fullName} 
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col py-2">
                <label>Email</label>
                <input 
                type="email" 
                name="email" 
                value={editedProfile.email} 
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col py-2">
                <label>Phone</label>
                <input 
                type="string" 
                name="phone" 
                value={editedProfile.phone} 
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col py-2">
                <label>Specialty</label>
                <select 
                  name="specialty" 
                  value={editedProfile.specialty}  
                  onChange={handleChange}   
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select Your Specialty</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Orthopedics">Orthopedics</option>
                  </select>
              </div>

              <div className="flex flex-col py-2">
                <label>Experiance</label>
                <select 
                  name="experiance" 
                  value={editedProfile.experiance}  
                  onChange={handleChange}   
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value=""></option>
                      <option value="1">1 Year</option>
                      <option value="2">2 Year</option>
                      <option value="3">3 Year</option>
                      <option value="4">4 Year</option>
                      <option value="5">5 Year</option>
                      <option value="6">6 Year</option>
                      <option value="7">7 Year</option>
                      <option value="8">8 Year</option>
                      <option value="9">9 Year</option>
                      <option value="10">10+ Year</option>
                  </select>
              </div>
              {/* <div className="flex flex-col py-2">
               <label>New Password</label>
               <input
                type="password"
                name="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              </div> */}
              
              <div className="flex gap-4 mt-10">
                <button
                onClick={handleUpdate}
                className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Save
                </button>

                <button
                onClick={()=>setIsEditing(false)}
                className="w-full bg-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gyay-700 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export { DoctorProfile };
