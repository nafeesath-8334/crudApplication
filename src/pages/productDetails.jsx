import { useState } from "react";
import { useLocation } from "react-router";


const ProductDetails = () => {
      const [showOverlay, setShowOverlay] = useState(true)
     const location = useLocation();
     const { ad } = location.state;

     if (!product) {
         return <p>Product not found.</p>
     }

    return (
        <div className=" mx-3 my-2 p-3">
            <div className="grid grid-cols-2  ">
            <div className="relative w-62 h-60 p-2" >
                        <img className='w-full h-full' src={ad.image} ></img>
                        {showOverlay && (
                            <div className="absolute bottom-0 left-0 w-20 bg-yellow-500  text-white p-1 text-center">
                                Featured
                            </div>
                        )}
                        
                        <div className="absolute top-2 right-2  bg-opacity-50 p-2 rounded-full">
                            <button><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg></button>


                        </div>

                    </div>
                <div className="text-2xl font-bold text-green-600 mt-4  border border-2 bg-slate-100 px-3 py-5"> 
                <p className="text-gray-500 mt-2">{ad.description}</p>
                <span>Price: {ad.price}</span>
                </div>
                <div className="  bg-slate-100">
                    <h1 className="text-2xl font-bold text-gray-800">{ad.title}</h1>
                    <p className="text-gray-500 mt-2">{ad.description}</p>

                </div>


                

            </div>



        </div>
    )
}

export default ProductDetails
