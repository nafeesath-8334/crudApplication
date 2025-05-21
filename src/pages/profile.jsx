import { useEffect, useState } from "react"
import { getUserAds, getUserDetails } from "../apiService/allApi"
import { useNavigate } from "react-router"
import ProductCard from "../component/productCard"
import Navbar from "../component/Navbar"
import  Footer  from "../component/Footer"



const Profile = () => {
    const [ads, setAds] = useState([])
    const [user, setUser] = useState({})
    const [img, setImg] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const fetchAdsData = async () => {
        const userData = JSON.parse(localStorage.getItem("userCredentials"))
        if (userData && userData.UserId) {
            try {
                setIsLoading(true)
                const result = await getUserAds(userData.UserId)
                setAds(result.data.data || [])
                console.log("User ads:", result)
            } catch (error) {
                console.error("Error fetching ads:", error)
            } finally {
                setIsLoading(false)
            }
        }
    }
    
    const handleEditItem = (adId) => {
        navigate("/editAd", { state: { adId } })
    }
    
    useEffect(() => {
        const fetchUserData = async () => {
            const userData = JSON.parse(localStorage.getItem("userCredentials"))
            if (userData && userData.UserId) {
                try {
                    const userId = userData.UserId
                    const userDetails = await getUserDetails(userId)
                    console.log("User details:", userDetails?.data?.data)
                    setUser(userDetails?.data?.data || {})
                    setImg(userDetails?.data?.data?.Image || "")
                } catch (error) {
                    console.error("Error fetching user details:", error)
                }
            }
        }
        
        fetchUserData()
        fetchAdsData()
    }, [])
    
    return (
    <>
    <Navbar/>
     <div className="flex flex-col min-h-screen bg-gray-100">
            {/* User Profile Section */}
            <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-500 to-gray-200 px-6 py-4">
                    <h1 className="text-2xl font-bold text-white">My Profile</h1>
                </div>
                
                <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        {/* Profile Image */}
                        <div className="relative">
                            <div className="h-36 w-36 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200">
                                {img ? (
                                    <img
                                        src={`http://localhost:3000${img}`}
                                        alt={user?.FirstName || "User"}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* User Details */}
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-2xl font-bold text-gray-800">{user?.FirstName || "User Name"}</h2>
                            <p className="text-gray-500 mb-2">{user?.email || "Email"}</p>
                            <p className="text-gray-600 mb-4">{user?.phoneNumber || ""}</p>
                            
                            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                <button 
                                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition shadow-sm"
                                    onClick={() => navigate("/editProfile", { state: { user } })}
                                >
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit Profile
                                </button>
                                
                                <button 
                                    className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition shadow-sm"
                                    onClick={() => navigate("/category")}
                                >
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                                    </svg>
                                    {ads?.length > 0 ? "Post Another Ad" : "Start Selling"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* User Advertisements Section */}
            <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
                <div className="bg-gradient-to-r from-gray-500 to-gray-100 px-6 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">My Advertisements</h2>
                    <span className="bg-white text-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
                        {ads?.length || 0} Items
                    </span>
                </div>
                
                {isLoading ? (
                    <div className="flex justify-center items-center p-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : ads?.length > 0 ? (
                    <div className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {ads.map((ad, index) => (
                                <div key={index} className="relative group">
                                    <ProductCard adds={ad} />
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button 
                                            onClick={() => handleEditItem(ad._id)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md"
                                            title="Edit Item"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-12 text-gray-500 bg-gray-50">
                        <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="text-xl font-medium">You haven't posted any ads yet</p>
                        <p className="mt-2 text-gray-500">When you post ads, they will appear here</p>
                        <button 
                            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
                            onClick={() => navigate("/category")}
                        >
                            Post Your First Ad
                        </button>
                    </div>
                )}
            </div>
        </div>
        <Footer/>
        </>
        
       
    )
}

export default Profile