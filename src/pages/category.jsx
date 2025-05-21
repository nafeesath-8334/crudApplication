import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';

const Category = () => {
    const [category, setCategory] = useState('')
    const [subcategory, setSubcategory] = useState('')
    const navigate = useNavigate()
    const location = useLocation();

    const handleSubmit = () => {

        navigate('/ads', {
            state: { category, subcategory }
        });

    };


    return (
        <><Navbar/>
<div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-gray-600 to-gray-200 p-6">
                    <h2 className="text-2xl font-bold text-white flex items-center"></h2>
                    <h2 className="text-xl font-bold mb-4">Post Your Ad</h2>
                </div>
                <div className="p-6">

                    <select
                        className="w-full p-2 border rounded-md"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        <option value="Vehicles">Vehicles</option>

                    </select>

                    <select
                        className="w-full p-2 border rounded-md mt-2"
                        value={subcategory}
                        onChange={(e) => setSubcategory(e.target.value)}
                    >
                        <option value="">Select Subcategory</option>
                        {category === "Vehicles" && (
                            <>
                                <option value="Cars">Cars</option>
                                <option value="Bikes">Bikes</option>
                            </>
                        )}

                    </select>

                    <div className="mt-4">
                        <p className="text-gray-700">Selected: {category} / {subcategory}</p>
                    </div>

                    <button className="mt-4 bg-gray-700 text-white py-2 px-4 rounded-md" onClick={handleSubmit}>
                        Submit Ad
                    </button>
                </div>
            </div>
        </div>
        <Footer/></>
        
    );
};

export default Category;
