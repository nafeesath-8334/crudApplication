
import { useNavigate } from "react-router";
import { useState } from "react";

const ProductCard = ({ adds }) => {
   const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  if (!adds) return null;

  // Format price with commas
  const formattedPrice = adds.price ? adds.price.toLocaleString() : "0";
  
  // Truncate title if too long
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const handleCardClick = () => {
    navigate(`/productDetails/${adds.adId}`, { state: { adds } });
  };

  return (
    <div 
      className= "bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300"
      //    {`${ isHovered ? "shadow-lg transform -translate-y-1" : ""
      // }`}
      //  onMouseEnter={() => setIsHovered(true)}
      //  onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Image container with fixed height */}
      <div className="relative h-52 overflow-hidden">
        {adds?.image && adds?.image?.length > 0 ? (
          <img
            src={`http://localhost:3000${adds.image[0]}`}
            alt={adds.title || "Product"}
            className= "w-full h-full object-cover transition-transform duration-500 "
            
           
          />
        ) : (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Badge for featured or newly added */}
        {adds?.featured && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 text-xs font-bold rounded shadow">
            Featured
          </div>
        )}
        
        {/* Price tag */}
        <div className="absolute bottom-3 right-3 bg-white bg-opacity-90 px-3 py-1 rounded-lg shadow text-green-600 font-bold">
          ₹{formattedPrice}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold text-gray-800 mb-1" title={adds?.title}>
            {truncateText(adds?.title, 22)}
          </h2>
          <div className={`h-2 w-2 rounded-full mt-1 ${adds?.isActive ? "bg-green-500" : "bg-gray-400"}`}></div>
        </div>
        
        {/* Vehicle details */}
        <div className="mt-2">
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            <span title={adds?.brand}>{truncateText(adds?.brand, 15)}</span>
            
            {adds?.year && (
              <>
                <span className="mx-1">•</span>
                <span>{adds.year}</span>
              </>
            )}
          </div>
          
          {adds?.kmDriven && (
            <div className="flex items-center text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{adds.kmDriven.toLocaleString()} km</span>
            </div>
          )}
        </div>
        
        {/* Category/Subcategory */}
        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="text-xs font-medium text-gray-600">{adds?.subcategory || adds?.category || "Vehicle"}</span>
          </div>
          
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs font-medium text-gray-600">{adds?.location || "Unknown"}</span>
          </div>
        </div>
      </div>
      
      {/* View Details button that appears on hover
      <div 
        className= "absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 "
          
      
      >
        <button className="bg-white text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
          View Details
        </button>
      </div> */}
    </div>
  );
};

export default ProductCard;
