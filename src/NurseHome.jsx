import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import nursehomeimage from './images/nurse.jpg'

const NurseHome = ()=>{

    const navigation = useNavigate()
    const handleSubmit=()=>{
        Swal.fire({
            icon: "success",
            title: "Your Logout Successfully",
            showConfirmButton: false,
            timer: 3000
            });
        navigation('/nurselogin')
    }
    return(
        <div
                          className="flex min-h-screen flex-col justify-center items-center px-6 py-12 lg:px-8 "
                          style={{
                                  backgroundImage: `url(${nursehomeimage})`,  // Correct path for the public folder
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                              }} 
                          >
                              <div 
                              className="border py-10 px-20 w-1/3 bg-white rounded-2xl drop-shadow-lg"
                              style={{
                                  backgroundColor: "rgba(255, 255, 255, 0.7)", // Transparent white background for the form
                                  backdropFilter: "blur(10px)", // Blur effect on the background
                                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Optional shadow for the form
                              }} >
        <div className="flex justify-center items-center">
            home

            <form action="" onSubmit={handleSubmit}>
            <button
            type="submit"
             className="bg-transparent hover:bg-pink-500 text-pink-700 font-semibold hover:text-white py-2 px-4 border border-pink-500 hover:border-transparent rounded"
            >Logout</button>
            </form>
        </div>
        </div>
        </div>
    )
}
export {NurseHome}