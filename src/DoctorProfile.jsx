import { Briefcase, Mail, Phone, Stethoscope, UserSquare2 } from "lucide-react";

const DoctorProfile = ({ doctorProfile, setDoctorProfile }) => {
  return (
    <div className="max-w-screen-lg mx-auto  px-6 py-6 mt-20 lg:flex md:flex border h-full">
      {/* <div className="flex gap-4 items-center"> */}
        <div className="w-1/2 sm:w-full">
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
        <div className="px-6 w-1/2 py-10">
          <p className="text-5xl font-bold">Dr. {doctorProfile?.fullName}</p>
          <div className="py-4">
            <div className="flex items-center gap-2 py-1">
                <Stethoscope className="w-8 h-8 text-gray-600" />
                <p>{doctorProfile?.specialty}</p>
            </div>
            <div className="flex items-center gap-2 py-1">
                <Briefcase className="w-8 h-8 text-gray-600" />
                <p>{doctorProfile?.experiance}+ years Experience</p>
            </div>
            <div className="flex items-center gap-2 py-1">
                <Mail className="w-8 h-8 text-gray-600" />
                <p>{doctorProfile?.email}</p>
            </div>
            <div className="flex items-center gap-2 py-1">
                <Phone className="w-8 h-8 text-gray-600" />
                <p>{doctorProfile?.phone}</p>
            </div>
            <div className="flex">
                <button>Edit</button>
                <button>Delete</button>
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export { DoctorProfile };
