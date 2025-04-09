import { useNavigate } from "react-router";

const ProductCard = () => {
    const navigate = useNavigate();

    return (
        <div className="px-3 py-4">
            <div className="shadow-2xl rounded border-2 border-slate-200 w-64">
                <div className="relative w-62 h-60 p-2">
                    <img 
                        className='w-full h-full cursor-pointer object-cover'
                        src=""
                        onClick={() => navigate("/productDetails")}
                        alt=""
                    />
                    <div className="absolute bottom-0 left-0 w-20 bg-yellow-500 text-white p-1 text-center">
                        Featured
                    </div>
                </div>

                <div className="px-4 py-3 flex flex-col items-start">
                    <h2 className="text-sm font-semibold text-gray-800"></h2>
                    <p className="text-sm text-gray-500 mt-1"></p>
                    <span className="text-lg font-bold text-green-600">₹ </span>
                </div>
            </div>
        </div>
    );
};
export default ProductCard;
