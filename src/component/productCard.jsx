import { useNavigate } from "react-router";

const ProductCard = ({ adds }) => {
    // if (!adds) return null; // or a placeholder, or fallback UI
const navigate=useNavigate()
    return (
        <div className="border p-4 rounded-lg shadow" onClick={()=>{navigate("/productDetails",{state:{adds}})}}>
            {adds?.image && adds?.image?.length > 0 && (
                <img
                    src={`http://localhost:3000${adds?.image[0]}`}
                    alt={adds?.title}
                    className="h-40 w-full object-cover rounded mb-2"
                />
            )}
            <h2 className="text-xl font-bold">{adds?.title}</h2>
            <p className="text-gray-700">{adds?.description}</p>
            <p className="text-green-600 font-semibold">₹{adds?.price}</p>
        </div>
    );
};
export default ProductCard
