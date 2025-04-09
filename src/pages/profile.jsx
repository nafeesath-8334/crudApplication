import { useEffect, useState } from "react"
import { getUserDetails } from "../apiService/allApi"
import { useNavigate } from "react-router"

const Profile = () => {
    const [user, setUser] = useState()
    const[img,setImg]= useState()
    const[previwimg,setPreviwimg]=useState()
    const navigate=useNavigate()
    
    useEffect(()=>{
        const userData=JSON.parse(localStorage.getItem("userCredentials"))
        const userId=userData.UserId
        // console.log(userData.UserId)
        const get=async()=>{
            const usrD=await getUserDetails(userId)
            console.log(usrD?.data?.data)
            setUser(usrD?.data?.data)
            setImg(usrD?.data?.data?.Image)

        }
       get()
        
    },[])
    return (
        <div className="flex  flex-col  min-h-screen bg-gray-100 p-4">
            <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow-md">

                
                <div className="relative h-32 w-32">
                    <img
                        src={img?`http://localhost:3000${img}`:""}
                        alt=""
                        className="w-32 h-32 rounded-full border-2 border-gray-300 "
                    />
                   
                </div>

                
                <div className="flex flex-col justify-center">
                    <h2 className="text-xl font-semibold text-gray-800"></h2>
                    <h2 className="text-xl font-semibold text-gray-800">{user?.FirstName || "User Name"}</h2>
                    <p className="text-gray-500">{user?.email || "Email"}</p>

                    <button className="mt-3 flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"  onClick={() => navigate("/editProfile", { state: { user } })}>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
                        </svg>
                        Edit Profile
                    </button>
                </div>
            </div>

            
            <button className="mt-6 bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"  onClick={() => navigate("/category")}>
                Start Selling
            </button>
        </div>
    )
}

export default Profile