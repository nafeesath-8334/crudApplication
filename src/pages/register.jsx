import { useState } from "react"
import { register } from "../apiService/allApi"
import { toast, ToastContainer } from "react-toastify"
import { useNavigate } from "react-router"

const Register = () => {
    const [userDetails, setUserDetails] = useState({ FirstName: "", LastName: "", email: "", password: "" })
    const navigate = useNavigate()
    const successnotify = () => toast("Registration successfull!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        //  transition: {Bounce},
    })
    const errornotify = () => toast("Registration Failed! ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        //  transition: Bounce,
    })

    const handle = async (event) => {
        event.preventDefault();
        if (userDetails.FirstName === '' || userDetails.LastName === '' || userDetails.email === '' || userDetails.password === '') {
            alert("fill the data")
            return
        }


        try {
            const result = await register(userDetails)

            console.log(result.status)
            if (result.status === 201) {
                successnotify()
                navigate("/login")

            } else {

                errornotify()
            }
        } catch (error) {
            return error

        }

        //     alert(`FirstName:${userDetails.FirstName}\nLastName:${userDetails.LastName}\nEmail:${userDetails.email}\nContact:${userDetails.password}`)
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-gray-700 to-gray-500 p-6">
                    <h2 className="text-2xl font-bold text-white flex items-center">
                      
                        Registration Form
                    </h2>
                    <p className="text-gray-200 text-sm mt-1">Create your account to get started</p>
                </div>

                {/* Form */}
                <form>
                    <div className="p-8">
                        <div>
                            {/* Name fields in two columns */}
                            <div className="flex flex-col md:flex-row gap-4 mb-6">
                                <div className="flex-1">
                                    <label className="block text-gray-700 font-medium text-sm mb-2">
                                        First Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            
                                        </div>
                                        <input
                                            type="text"
                                            name="first"
                                            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="John"
                                            value={userDetails.FirstName}
                                            onChange={(e) => setUserDetails({ ...userDetails, FirstName: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <label className="block text-gray-700 font-medium text-sm mb-2">
                                        Last Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            
                                        </div>
                                        <input
                                            type="text"
                                            name="last"
                                            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Doe"
                                            value={userDetails.LastName}
                                            onChange={(e) => setUserDetails({ ...userDetails, LastName: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="mb-6">
                                <label className="block text-gray-700 font-medium text-sm mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="your@email.com"
                                        value={userDetails.email}
                                        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="mb-8">
                                <label className="block text-gray-700 font-medium text-sm mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                       
                                    </div>
                                    <input
                                        type="password"
                                        name="pswrd"
                                        maxLength="10"
                                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="••••••••"
                                        value={userDetails.password}
                                        onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                                    />
                                    <div className="absolute right-3 text-xs text-gray-400 top-1/2 transform -translate-y-1/2">
                                        Max 10 characters
                                    </div>
                                </div>
                            </div>

                            {/* Submit button */}
                            <button
                                onClick={handle}
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg"
                            >
                                Create Account
                            </button>

                            {/* Optional: Add login link */}
                            <div className="mt-4 text-center text-sm text-gray-600">
                                Already have an account?
                                <a href="#" className="ml-1 text-blue-600 hover:text-blue-800 font-medium">
                                    Sign in
                                </a>
                            </div>
                        </div>
                    </div>
           
        </form>
           
       








    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
    //  transition={Bounce} 
    />
            
        </div>
        </div>    
        
          )
}

export default Register
