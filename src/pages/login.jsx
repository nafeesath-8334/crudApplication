import { useState } from "react"
import { login } from "../apiService/allApi"
import {  ToastContainer,toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { updateIsLoggedIn } from "../reduxToolKit/slice"
import { useNavigate } from "react-router"

const Login = () => {
    const [userDetails, setUserDetails] = useState({ password: "", email: "" })
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const successnotify = () => toast.success("Successfully logged in!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })
    
    const errornotify = () => toast.error("Login Failed! Check your email & password", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    })

    const handler = async (e) => {
        e.preventDefault()
        if (userDetails.email === '' || userDetails.password === '') {
            toast.warning("Please fill in all fields", {
                position: "top-center",
                theme: "colored",
            })
            return
        }

        setIsLoading(true)
        try {
            const result = await login(userDetails)
            console.log(result)

            if (result.status === 200) {
                successnotify()
              
                const userCredentials = {
                    UserId: result.data.userDetails.userId,
                    Name: result.data.userDetails.FirstName,
                    email: result.data.userDetails.email,
                    password: result.data.userDetails.password,
                }
                localStorage.setItem("userCredentials", JSON.stringify(userCredentials))
                localStorage.setItem("token", JSON.stringify(result.data.token))

                dispatch(updateIsLoggedIn(true))
                navigate("/Home")
            } else {
                errornotify()
            }
        } catch (error) {
            errornotify()
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
                <div className="bg-gray-600 py-6">
                    <h2 className="text-center text-3xl font-bold text-white">Welcome Back</h2>
                    <p className="mt-2 text-center text-indigo-200">Please sign in to your account</p>
                </div>
                
                <form onSubmit={handler} className="p-6">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                                Email Address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    placeholder="your.email@example.com"
                                    value={userDetails.email}
                                    onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                                    Password
                                </label>
                                <a href="forgotPassword" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </a>
                            </div>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    placeholder="••••••••"
                                    value={userDetails.password}
                                    onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="flex w-full items-center justify-center rounded-lg bg-gray-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : (
                                    "Sign in"
                                )}
                            </button>
                        </div>
                    </div>
                </form>
                
                <div className="bg-gray-50 px-6 py-4">
                    <div className="text-center text-sm">
                        <span className="text-gray-600">Don't have an account? </span>
                        <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign up
                        </a>
                    </div>
                </div>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    )
}

export default Login