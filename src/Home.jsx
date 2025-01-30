import React from "react";
import Swal from "sweetalert2";

const Home = () => {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    Swal.fire({
        icon:'success',
        title: 'Success!',
        text: 'LogOut successfully',
        showConfirmButton:false,
        timer:4000,
            })
    window.location.href = "/login";
  };
  return (
    <div>
      <button onClick={handleLogout}>LogOut</button>
    </div>
  );
};

export default Home;
