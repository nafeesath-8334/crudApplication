
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import Carousel from 'react-bootstrap/Carousel';
import { addToFavorites, deleteAd, getUserDetails, removeFromFavorites } from "../apiService/allApi";

import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

const ProductDetails = () => {
    const [showOverlay, setShowOverlay] = useState(true);
    const [isFavorited, setIsFavorited] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const { adds } = location.state || {};
    const { adId } = useParams();

    // Check if ad exists
    if (!adds) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center p-8 bg-red-50 rounded-xl shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-xl font-semibold text-red-700">Product not found</p>
                    <p className="mt-2 text-gray-600">The requested product details could not be loaded.</p>
                    <button
                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg"
                        onClick={() => navigate("/")}
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        );
    }



    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                if (adds && adds.userId) {
                    const response = await getUserDetails(adds.userId);
                    if (response && response.data && response.data.data) {
                        setUserDetails(response.data.data);
                    }
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user details:", error);
                setLoading(false);
            }
        };

        // Check if ad is already favorited
        const checkFavoriteStatus = () => {
            const userCredentials = localStorage.getItem("userCredentials");
            if (userCredentials) {
                const parsedCredentials = JSON.parse(userCredentials);
                const favorites = parsedCredentials.favorites || [];
                if (favorites.includes(adds.adId)) {
                    setIsFavorited(true);
                }
            }
        };

        fetchUserDetails();
        checkFavoriteStatus();
    }, [adds.adId]);

    const handleDelete = async () => {
        if (!confirmDelete) {
            setConfirmDelete(true);
            return;
        }

        try {
            if (!adds || !adds.adId) {
                alert("Cannot delete: Ad ID is missing");
                return;
            }

            setLoading(true);
            const response = await deleteAd(adds.adId);

            if (response.status === 200) {
                setLoading(false);
                navigate("/profile", { state: { message: "Ad deleted successfully" } });
            }
        } catch (error) {
            console.error("Error deleting ad:", error);
            alert(error.response?.data?.message || "Failed to delete ad");
            setLoading(false);
            setConfirmDelete(false);
        }
    };

    const handleFavorite = async (e) => {
        e.preventDefault()
        try {
            const userCredentials = localStorage.getItem("userCredentials");

            if (!userCredentials) {
                alert("Please login to add to favorites");
                return;
            }

            const parsedCredentials = JSON.parse(userCredentials);
            const userId = parsedCredentials.UserId;

            if (!userId) {
                alert("User authentication error. Please login again.");
                return;
            }

            setLoading(true);
            console.log("Current favoritStatus:", isFavorited);
            console.log("UserId:", userId);
            console.log("AdId:", adds.adId);


            if (isFavorited) {
                const body = {
                    "userId": userId,
                    "adId": adds.adId
                }
                //     // Remove from favorites
                await removeFromFavorites(body);

                // Update local storage favorites
                const updatedCredentials = {
                    ...parsedCredentials,
                    favorites: (parsedCredentials.favorites || []).filter(id => id !== adds.adId)
                };
                localStorage.setItem("userCredentials", JSON.stringify(updatedCredentials));

                setIsFavorited(!isFavorited);

            } else {
                // const body={userId,"adId":adds.adId}
                const body = {
                    "userId": userId,
                    "adId": adds.adId
                }
                //Add to favorites
                await addToFavorites(body);

                // Update local storage favorites
                const updatedCredentials = {
                    ...parsedCredentials,
                    favorites: [...(parsedCredentials.favorites || []), adds.adId]
                };
                localStorage.setItem("userCredentials", JSON.stringify(updatedCredentials));

                setIsFavorited(isFavorited);

            }

            setLoading(true);
        } catch (err) {
            console.error("Error updating favorites:", err);
            alert(err.response?.data?.message || "Failed to update favorites");
            setLoading(false);
        }
    };




    return (
        <><Navbar/>
         <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="flex mb-6" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2">
                        <li>
                            <button onClick={() => navigate("/Home")} className="text-gray-500 hover:text-gray-700">Home</button>
                        </li>
                        <li className="flex items-center">
                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-900 font-medium ml-2">{adds.title}</span>
                        </li>
                    </ol>
                </nav>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="md:flex">
                            {/* Left column - Image gallery */}
                            <div className="md:w-1/2">
                                <div className="relative h-96">
                                    <Carousel interval={null} className="h-full">
                                        {adds.image.map((item, index) => (
                                            <Carousel.Item key={index} className="h-full">
                                                <img
                                                    src={`http://localhost:3000${item}`}
                                                    alt={`${adds.title} - Image ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>

                                    {showOverlay && (
                                        <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 text-sm font-bold rounded-md shadow-lg">
                                            Featured
                                        </div>
                                        
                                    )}
                                     <button
                                            className={`${isFavorited ? " absolute top-4 right-4 bg-gray-400" : "bg-yellow-500 hover:bg-yellow-600"
                                                } text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center flex-1`}
                                            // onClick={handleFavorite}
                                            disabled={loading}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill={isFavorited ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                            {isFavorited ? "Favorited" : "Add to Favorites"}
                                        </button>
                                    
                                    {/* <button
                                        className="absolute top-4 right-4 bg-white bg-opacity-90 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all"
                                        onClick={handleFavorite}
                                        disabled={loading}
                                        aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill={isFavorited ? "currentColor" : "none"}
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6 text-red-600"
                                           
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                            />
                                        </svg>
                                    </button> */}
                                </div>
                               

                            </div>

                            {/* Right column - Product details */}
                            <div className="md:w-1/2 p-8">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h1 className="text-3xl font-bold text-gray-900">{adds.title}</h1>
                                        <p className="text-2xl font-semibold text-green-600 mt-2">₹{adds.price.toLocaleString()}</p>
                                    </div>
                                    <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                                        <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                                        <span className="text-sm font-medium text-blue-700">Active</span>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h2 className="text-lg font-semibold text-gray-900">Vehicle Specifications</h2>
                                    <div className="mt-4 grid grid-cols-2 gap-4">
                                        <div className="flex items-center">
                                            <div className="bg-blue-100 p-2 rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-gray-500">Brand</p>
                                                <p className="font-medium text-gray-900">{adds.brand}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="bg-blue-100 p-2 rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-gray-500">Year</p>
                                                <p className="font-medium text-gray-900">{adds.year}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="bg-blue-100 p-2 rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-gray-500">Fuel Type</p>
                                                <p className="font-medium text-gray-900">{adds.fuel}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="bg-blue-100 p-2 rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-gray-500">Transmission</p>
                                                <p className="font-medium text-gray-900">{adds.transmission}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="bg-blue-100 p-2 rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-gray-500">Kilometers Driven</p>
                                                <p className="font-medium text-gray-900">{adds.kmDriven.toLocaleString()} km</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="bg-blue-100 p-2 rounded-full">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm text-gray-500">Owner</p>
                                                <p className="font-medium text-gray-900">{adds.owners}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <div className="flex space-x-4">
                                        {/* <button
                                        className="absolute top-4 right-4 bg-white bg-opacity-90 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all"
                                        onClick={handleFavorite}
                                        disabled={loading}
                                        // aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                                    >{isFavorited ? "Remove from favorites" : "Add to favorites"}</button> */}
                                        <button className="bg-yellow-500 hover:bg-yellow-600 
                                                 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center " onClick={handleFavorite}>{isFavorited ? "Remove from favorites" : "Add to favorites"}</button>
                                        
                                        <button
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition flex items-center justify-center flex-1"
                                            onClick={() => navigate(`/editAd/${adds.adId}`)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit Ad
                                        </button>
                                    </div>
                                    <button
                                        className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition w-full flex items-center justify-center"
                                        onClick={handleDelete}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        {confirmDelete ? "Confirm Delete" : "Delete Ad"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Description section */}
                        <div className="p-8 border-t border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
                            <p className="text-gray-700 leading-relaxed">{adds.description}</p>
                        </div>

                        {/* Seller Information */}
                        <div className="p-8 bg-gray-50 border-t border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Seller Information</h2>
                            {userDetails ? (
                                <div className="flex items-start">
                                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">{userDetails.FistName}</h3>

                                        <div className="mt-4 flex flex-col space-y-2">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                <span className="text-gray-700">{userDetails.email}</span>
                                            </div>
                                            {userDetails.Contact && (
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    <span className="text-gray-700">{userDetails.Contact}</span>
                                                </div>
                                            )}
                                            {userDetails.Location && (
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span className="text-gray-700">{userDetails.Location}</span>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-600">Seller information not available</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
   
        <Footer/>
        </>
        );
};

export default ProductDetails;