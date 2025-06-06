import { useEffect, useState } from "react";
import { addAds } from "../apiService/allApi";
import { toast, ToastContainer } from "react-toastify"
import { Navigate, useLocation, useNavigate } from "react-router";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const Ads = () => {
    const location = useLocation();
    const { category, subcategory } = location.state || {};
    console.log("category", category, "sub", subcategory)
    // const user = location.state?.user;
    const [adsList, setAdsList] = useState([]);
    const [userData, setUserData] = useState({
        UserId: '',
    })
    const navigate = useNavigate()
    const successnotify = () => toast("Ad posted successfully!", {
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
    const [image, setImage] = useState()
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userCredentials"));
        if (userData && userData.UserId) {
            setFormData((prev) => ({
                ...prev,
                userId: userData.UserId,
            }));
        }
    }, []);


    useEffect(() => {
        console.log(userData)
    }, [userData])

    const [formData, setFormData] = useState({
        brand: '',
        year: '',
        fuel: '',
        transmission: '',
        kmDriven: '',
        owners: '',
        title: '',
        description: '',
        location: '',
        price: '',
        image: [],
        category: category,
        subcategory: subcategory,
        userId: userData.UserId,
    });
    // const handle = async (event) => {
    //     event.preventDefault();
    //     if (formData.brand === ''||formData.year === ''||formData.fuel === ''||formData.transmission === ''||formData.kmDriven === ''||formData.owners === ''||formData.title === ''||formData.description === ''||formData.location === ''||formData.price=="") {
    //         alert("fill the data")
    //         return
    //     }
    // }
    const handleImage = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prev) => ({
            ...prev,
            image: files
        }));
    };

    const handleChange = (e) => {
        const { name, value, files, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const adData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === "image") {
                value.forEach((img) => adData.append("images", img)); // match the backend field name
            }

            else {
                adData.append(key, value);
            }
        });

        try {
            const headers = { "Content-Type": "multipart/form-data" };
            // const res = await addAds(userData?.UserIds,adData, headers);
            const res = await addAds(adData, headers);
            if (res.status === 201) {
                successnotify()
                alert("Ad posted successfully!");
                navigate('/Home')
            } else {
                errornotify()

                alert("failed to add")
            }

        } catch (err) {
            console.error("Error posting ad:", err);
            alert("Failed !!!.");
        }
    };


    return (
        <>
            <Navbar />
            <form onSubmit={handleSubmit}>

                <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">

                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                        <h1 className="text-2xl font-bold text-center mb-4">POST YOUR ADS</h1>
                        <div>
                            <h2 className="text-xl font-semibold mb-2">INCLUDE SOME DETAILS</h2>

                            <label className="block font-medium">BRAND</label>
                            <select
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md mb-4"
                            >
                                {/* <option value="">ALL BRANDS</option> */}
                                {(formData.subcategory == "Cars" ? 
                                    <>
                                        <option>TATA</option>
                                        <option>MARUTI</option>
                                        <option>TOYOTA</option>
                                        <option>NISSAN</option>
                                    </>
                                 : 
                                    <>
                                        <option>BAJAJ</option>
                                        <option>HERO</option>
                                        <option>YAMAHA</option>
                                    </>
                                )}
                            </select>
                            <label className="block font-medium">YEAR</label>
                            <input
                                type="text"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md mb-4"
                            />

                            <label className="block font-medium">FUEL</label>
                            <select
                                name="fuel"
                                value={formData.fuel}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md mb-4"
                            >
                                <option value="">SELECT</option>
                                <option>DIESEL</option>
                                <option>PETROL</option>
                                <option>ELECTRIC</option>
                                <option>CNG & HYBRID</option>
                            </select>

                            <label className="block font-medium">TRANSMISSION</label>
                            <select
                                name="transmission"
                                value={formData.transmission}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md mb-4"
                            ><option value="">SELECT</option>
                                <option>AUTOMATIC</option>
                                <option>MANUAL</option>
                            </select>

                            <label className="block font-medium">KM DRIVEN</label>
                            <input
                                type="text"
                                name="kmDriven"
                                value={formData.kmDriven}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md mb-4"
                            />

                            <label className="block font-medium">NO. OF OWNERS</label>
                            <select
                                name="owners"
                                value={formData.owners}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md mb-4"
                            ><option value="">SELECT</option>
                                <option>1st</option>
                                <option>2nd</option>
                                <option>3rd</option>
                            </select>

                            <label className="block font-medium">ADD TITLE</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md mb-4"
                            />

                            <label className="block font-medium">DESCRIPTION</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md mb-4"
                            ></textarea>
                            <label className="block font-medium">LOCATION</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md mb-4"
                            />

                            <label className="block font-medium">SET PRICE</label>
                            <input
                                type="text"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md mb-4"
                            />

                            <div className="relative h-32 w-32 flex gap-2 mt-2">
                                {formData.image && formData.image.map((img, i) => (
                                    <img key={i} src={URL.createObjectURL(img)} alt={`preview-${i}`} className="h-20 w-20 object-cover square" />
                                ))}
                                <label className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow ">
                                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M4 18V8a1 1 0 0 1 1-1h1.5l1.707-1.707A1 1 0 0 1 8.914 5h6.172a1 1 0 0 1 .707.293L17.5 7H19a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
                                        <path stroke="currentColor" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>

                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImage}

                                    />
                                </label>
                            </div>


                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-3 rounded-md font-bold hover:bg-blue-600"
                            >
                                Submit Ad
                            </button>


                        </div>
                    </div>
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

            </form>

            <Footer /></>

    )
}

export default Ads
