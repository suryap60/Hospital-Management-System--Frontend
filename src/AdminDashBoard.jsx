const AdminDashBoard = ({stats}) =>{
    return (
        <div className="max-w-screen-lg mx-auto px-4">
            <h1 className="ps-6 font-semibold text-xl md:text-xl">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 ">
                
                { stats?.map((stat, index)=>(
                <div key={index} className="bg-gradient-to-b from-blue-200 to-white h-36 md:h-40 lg:h-48 w-full p-4 md:p-5 lg:p-6 rounded-lg shadow flex transition delay-150 duration-300 ease-in-out hover:-translate-y-1">
                    <div className="flex flex-col justify-between ">
                        <div className="flex ">
                            <p className="text-7xl text-blue-600 font-semibold">{stat.value}</p>
                            <stat.icon className=' h-14 w-12 ms-10 mt-3 font-semibold text-blue-950'/>
                        </div>
                            <p className="text-xl text-gray-900">{stat.title}</p>     
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}
export { AdminDashBoard }