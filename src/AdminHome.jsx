import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const AdminHome = ()=>{

    const navigation = useNavigate()
    const handleSubmit=()=>{
        Swal.fire({
            icon: "success",
            title: "Your Logout Successfully",
            showConfirmButton: false,
            timer: 3000
            });
        navigation('/login')
    }
    return(
        <div className="flex justify-center items-center">
            home

            <form action="" onSubmit={handleSubmit}>
            <button
            type="submit"
             className="bg-transparent hover:bg-pink-500 text-pink-700 font-semibold hover:text-white py-2 px-4 border border-pink-500 hover:border-transparent rounded"
            >Logout</button>
            </form>
        </div>
    )
}
export {AdminHome}