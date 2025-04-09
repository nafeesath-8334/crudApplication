import { useState } from "react"
import { register } from "../apiService/allApi"
import { toast, ToastContainer } from "react-toastify"
import { useNavigate } from "react-router"

const Register = () => {
    const [userDetails, setUserDetails] = useState({ FirstName: "", LastName: "", email: "", password: "" })
    const navigate=useNavigate()
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

        alert(`FirstName:${userDetails.FirstName}\nLastName:${userDetails.LastName}\nEmail:${userDetails.email}\nContact:${userDetails.password}`)
    }
    return (
        <div className="flex justify-center items-center  bg-gray-100">
            <div className="bg-white p-8 rounded-lg  w-96">
                <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                    Registration Form
                </h2>

                <form onSubmit={handle}>

                    <div>
                        <label className=" text-gray-600 font-medium">
                            First Name:
                        </label>
                        <input type="text" name="first" className="w-full px-3 py-2 border rounded-md " value={userDetails.FirstName} onChange={(e) => setUserDetails({ ...userDetails, FirstName: e.target.value })} required />
                    </div>


                    <div>
                        <label className=" text-gray-600 font-medium">
                            Last Name:
                        </label>
                        <input type="text" name="last" className="w-full px-3 py-2 border rounded-md " value={userDetails.LastName} onChange={(e) => setUserDetails({ ...userDetails, LastName: e.target.value })} required />
                    </div>

                    <label className=" text-gray-600 font-medium">
                        Email:
                    </label>
                    <input type="email" name="email" className="w-full px-3 py-2 border rounded-md" value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} required />

                    <div>
                        <label className="text-gray-600 font-medium">
                            Password:
                        </label>
                        <input type="text" name="pswrd" maxLength="10" className="w-full px-3 py-2 border rounded-md mb-5 " required value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} />
                    </div>


                    <button type="submit" onClick={handle}
                        className="w-full bg-blue-500 text-white py-2 rounded-md"
                    >
                        Submit
                    </button>
                </form>
            </div >
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
        </div >
    )
}

export default Register
