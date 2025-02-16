import axios from "axios";
import { BriefcaseMedical, Hospital, Mail, Phone, Stethoscope, UserCircle2 } from "lucide-react";
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
          <div>
            <h1 className="font-semibold pt-6 text-3xl md:text-3xl">
              Your Profile
            </h1>
            <div className="rounded-xl mt-4 border">
              <div className="w-full bg-blue-50 sm:w-full flex items-center ">
                <div>
                  {doctorProfile?.profilePicture ? (
                    <img
                      src={doctorProfile.profilePicture}
                      alt="Doctor Profile"
                      className="w-12 h-12 px-8 rounded-full mb-2"
                    />
                  ) : (
                  <UserCircle2 className="w-full px-10 py-3 h-32 text-blue-700 mb-2" />
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="text-3xl font-bold">Dr. {doctorProfile?.fullName}</p>
                  <div className="flex items-center gap-2 py-2">
                      <Stethoscope className="w-8 h-8 text-blue-600" />
                      <p className="text-lg text-blue-700">{doctorProfile?.specialty}</p>
                  </div>
                </div>
              </div>

              <div className="px-10 w-full ">
                <p className="pt-5 text-xl">Personal Information</p>
                <div className="py-2">
                  <div className="md:flex lg:flex justify-between gap-3">
                    <div className="flex items-center gap-2 py-2 block w-full rounded-md mt-2  bg-blue-50 sm:text-sm transition duration-300 ease-in-out hover:-translate-y-1">
                        <BriefcaseMedical className="w-8 h-8 text-red-700 mx-4" />
                        <div className="px-3">
                          <label>Experiance</label>
                          <p className="text-lg py-1">{doctorProfile?.experiance}+ years</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 py-2 block w-full rounded-md mt-2  bg-blue-50 sm:text-sm transition duration-300 ease-in-out hover:-translate-y-1">
                        <Hospital className="w-8 h-8 text-green-700 mx-4" />
                        <div className="px-3">
                          <label >Department</label> 
                          <p className="text-lg py-1">{doctorProfile?.specialty}</p>
                        </div>
                    </div>
                  </div>
                  <div className="md:flex lg:flex justify-between gap-3 mt-4">
                    <div className="flex items-center gap-2 py-2 block w-full rounded-md mt-2  bg-blue-50 sm:text-sm transition duration-300 ease-in-out hover:-translate-y-1">
                        <Mail className="w-8 h-8 text-gray-600 mx-4" />
                        <div className="px-3">
                          <label>Email Address</label>
                        <p className="text-lg py-1">{doctorProfile?.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 py-2 block w-full rounded-md mt-2  bg-blue-50 sm:text-sm transition duration-300 ease-in-out hover:-translate-y-1">
                        <Phone className="w-8 h-8 text-blue-600 mx-4" />
                        <div className="px-3">
                          <label>Phone Number</label>
                        <p className="text-lg py-2">{doctorProfile?.phone}</p>
                        </div>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-7 pb-5">
                    <button 
                    className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    onClick={()=> setIsEditing(true)}
                    >
                      Edit
                    </button>
                    <button 
                    className="w-full bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) 
        : (
          <div>
            <h1 className="font-semibold text-3xl text-blue-700 md:text-3xl pt-4">
              Edit Profile
            </h1>
            <div className="rounded-2xl drop-shadow-lg border justify-center lg:w-3/4 px-6 py-6 mt-4  lg:flex md:flex h-full ">
              <div className="w-full justify-center">
                  <div className="flex flex-col py-2 w-full">
                    <label className="font-semibold text-lg">Full Name</label>
                    <input 
                    type="text" 
                    name="fullName" 
                    value={editedProfile.fullName} 
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex flex-col py-2 w-full">
                    <label className="font-semibold text-lg">Email</label>
                    <input 
                    type="email" 
                    name="email" 
                    value={editedProfile.email} 
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex flex-col py-2 w-full">
                    <label className="font-semibold text-lg">Phone</label>
                    <input 
                    type="string" 
                    name="phone" 
                    value={editedProfile.phone} 
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
              
                  <div className="flex flex-col py-2 w-full">
                    <label className="font-semibold text-lg">Specialty</label>
                    <select 
                      name="specialty" 
                      value={editedProfile.specialty}  
                      onChange={handleChange}   
                      className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="">Select Your Specialty</option>
                          <option value="Cardiology">Cardiology</option>
                          <option value="Dermatology">Dermatology</option>
                          <option value="Neurology">Neurology</option>
                          <option value="Pediatrics">Pediatrics</option>
                          <option value="Orthopedics">Orthopedics</option>
                      </select>
                  </div>

                  <div className="flex flex-col py-2 w-full">
                    <label className="font-semibold text-lg">Experiance</label>
                    <select 
                      name="experiance" 
                      value={editedProfile.experiance}  
                      onChange={handleChange}   
                      className="w-full px-3 py-2 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value=""></option>
                          <option value="1">1 Year</option>
                          <option value="2">2 Years</option>
                          <option value="3">3 Years</option>
                          <option value="4">4 Years</option>
                          <option value="5">5 Years</option>
                          <option value="6">6 Years</option>
                          <option value="7">7 Years</option>
                          <option value="8">8 Years</option>
                          <option value="9">9 Years</option>
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
                  className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 "
                  >
                    Save
                  </button>

                  <button
                  onClick={()=>setIsEditing(false)}
                  className="w-full bg-white border border-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-300 "
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export { DoctorProfile };
