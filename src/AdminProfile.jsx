import axios from "axios";
import { BriefcaseMedical, Hospital, Mail, Phone, Stethoscope, UserCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AdminProfile = ({ adminProfile, setAdminProfile }) => {
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
        const profileResponse = await axios.get('http://localhost:2000/api/viewAdminProfile',
            {headers: { authorization: token}}
        );
        setAdminProfile(profileResponse.data.admin)
        setEditedProfile(profileResponse.data.admin)
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
      const updateProfileResponse = await axios.put('http://localhost:2000/api/updateAdminProfile',
        editedProfile, // Send the updated profile data in the body
        { headers: { authorization: token } }
      );
      setAdminProfile(updateProfileResponse.data.admin)
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
                  {adminProfile?.profilePicture ? (
                    <img
                      src={adminProfile.profilePicture}
                      alt="Doctor Profile"
                      className="w-12 h-12 px-8 rounded-full mb-2"
                    />
                  ) : (
                  <UserCircle2 className="w-full px-10 py-3 h-32 text-blue-700 mb-2" />
                  )}
                </div>
                  <div>
                    <p className="text-3xl font-bold">{adminProfile?.adminName}</p>
                    <p>{adminProfile.email}</p>
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
        ) 
        : (
          <div>
            <h1 className="font-semibold text-3xl text-blue-700 md:text-3xl pt-4">
              Edit Profile
            </h1>
            <div className="rounded-2xl drop-shadow-lg border justify-center lg:w-3/4 px-6 py-6 mt-4  lg:flex md:flex h-full">
              <div className="w-full justify-center">
                  <div className="flex flex-col py-2 w-full">
                    <label className="font-semibold text-lg">Full Name</label>
                    <input 
                    type="text" 
                    name="adminName" 
                    value={editedProfile.adminName } 
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

export { AdminProfile };
