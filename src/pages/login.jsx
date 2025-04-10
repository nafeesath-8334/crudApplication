import { useState } from "react"
import { login } from "../apiService/allApi"
import { toast, ToastContainer } from "react-toastify"
import { useDispatch } from "react-redux"
import { updateIsLoggedIn } from "../reduxToolKit/slice"
import { useNavigate } from "react-router"

const Login = () => {
    // const [userDetails, setUserDetails] = useState({ userId:"",firstName: "", password: "", email: "" })
    const [userDetails, setUserDetails] = useState({ password: "", email: "" })
    const dispatch = useDispatch()
    const navigate=useNavigate()

    const successnotify = () => toast(`successfully login !  `, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        //  transition: {Bounce},
    })
    const errornotify = () => toast("Login Failed!! Check your email & password", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        //  transition: Bounce,
    })
    const handler = async () => {
        if ( userDetails.email === '' || userDetails.password === '') {
            alert("fill the data")
            return
        }
        try {
            const result = await login(userDetails)
            console.log(result)

            if (result.status === 200) {

                successnotify()
              
                const userCredentials = {
                    UserId:result.data.userDetails.userId,
                    Name: result.data.userDetails.FirstName,
                    email: result.data.userDetails.email,
                    password: result.data.userDetails.password,
                }
                localStorage.setItem("userCredentials", JSON.stringify(userCredentials))

                localStorage.setItem("token", JSON.stringify(result.data.token))

                dispatch(updateIsLoggedIn(true))
                navigate("/")
            } else {

                errornotify()
            }
        } catch (error) {
            return error


        }


        alert(`Password:${userDetails.password}\nEmail:${userDetails.email}`)
    }



    return (
        <div className="flex flex-col items-center justify-center rounded h-screen" >
            <div className="  border border-slate-300 bg-gray-100 w-96">
                <h2 className="  my-5 ms-3 me-3 text-2xl font-bold text-center  text-gray-900">Login to your account</h2>
                
                <div className="my-3  ms-3 me-3 flex flex-col ">
                    <label>Email Address</label>
                    <input className="border px-3 py-1.5 outline outline-1  focus:outline focus:outline-2  rounded" type="email" name="email" value={userDetails.email} onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} />

                </div>
                <div className="my-3 flex flex-col">
                    <div className="flex  ms-3 me-3 ">
                        <label>Password</label>

                    </div>

                    <input className="border ms-3 me-3 px-3 py-1.5 outline outline-1  focus:outline focus:outline-2  rounded" type="password" name="password" value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} />

                </div>
                <div className="mx-3  mt-2 mb-3">
                    <button className=" w-full  bg-indigo-600 font-semibold text-white hover:bg-indigo-500  text-sm/6 px-3 py-1.5 rounded " type="submit" onClick={handler}>sign in</button>
                </div>
            </div>

            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            // transition={Bounce} 
            />
        </div>
    )
}

export default Login

