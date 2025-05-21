import { useEffect, useState } from "react";
import { updateAd, getAdById } from "../apiService/allApi"; // Assuming you have these API functions
import { useLocation, useNavigate, useParams } from "react-router-dom";

const EditAds = () => {
  const { adId } = useParams(); // Get ad ID from URL parameters
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState([]);
  
  const [formData, setFormData] = useState({
    brand: '',
    year: '',
    fuel: '',
    transmission: '',
    kmDriven: '',
    owners: '',
    title: '',
    description: '',
    price: '',
    image: [],
    category: '',
    subcategory: '',
    userId: '',
  });

  // Fetch the ad data when component mounts
  useEffect(() => {
    const fetchAdData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem("userCredentials"));
        if (!userData || !userData.UserId) {
          navigate('/login', { state: { from: location.pathname } });
          return;
        }

        setFormData(prev => ({
          ...prev,
          userId: userData.UserId
        }));

        // Fetch ad details
        const response = await getAdById(adId);
        if (response.status === 200) {
          const adData = response.data;
          
          // Set form data from ad
          setFormData({
            brand: adData.brand || '',
            year: adData.year || '',
            fuel: adData.fuel || '',
            transmission: adData.transmission || '',
            kmDriven: adData.kmDriven || '',
            owners: adData.owners || '',
            title: adData.title || '',
            description: adData.description || '',
            price: adData.price || '',
            image: [], // We'll handle existing images separately
            category: adData.category || '',
            subcategory: adData.subcategory || '',
            userId: userData.UserId,
          });
          
          // If there are existing images, set them for preview
          if (adData.images && adData.images.length > 0) {
            setImagePreview(adData.images);
          }
        } else {
          alert("Failed to fetch ad details");
          navigate('/Home');
        }
      } catch (err) {
        console.error("Error fetching ad:", err);
        alert("Failed to load ad details");
      } finally {
        setLoading(false);
      }
    };

    fetchAdData();
  }, [adId, navigate, location.pathname]);

  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      image: files
    }));
    
    // Create URL previews for the new images
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreview(prev => [...prev, ...newPreviews]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "image") {
        value.forEach((img) => adData.append("images", img));
      } else {
        adData.append(key, value);
      }
    });

    // Add flag to indicate if we're keeping existing images
    adData.append("keepExistingImages", imagePreview.length > 0);

    try {
      const headers = { "Content-Type": "multipart/form-data" };
      const res = await updateAd(adId, adData, headers);
      if (res.status === 200) {
        alert("Ad updated successfully!");
        navigate('/profile'); // Navigate to user's ads or another appropriate page
      } else {
        alert("Failed to update ad");
      }
    } catch (err) {
      console.error("Error updating ad:", err);
      alert("Failed to update ad. Please try again.");
    }
  };

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading ad details...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center p-6 bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <h1 className="text-2xl font-bold text-center mb-4">EDIT YOUR AD</h1>
          <div>
            <h2 className="text-xl font-semibold mb-2">UPDATE DETAILS</h2>

            <label className="block font-medium">BRAND</label>
            <select
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mb-4"
            >
              <option value="">ALL BRANDS</option>
              <option>TATA</option>
              <option>MARUTI</option>
              <option>TOYOTA</option>
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
            >
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
            >
              <option>1st</option>
              <option>2nd</option>
              <option>3rd</option>
            </select>

            <label className="block font-medium">AD TITLE</label>
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

            <label className="block font-medium">PRICE</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded-md mb-4"
            />

            <div className="mb-4">
              <label className="block font-medium mb-2">IMAGES</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {imagePreview.map((img, i) => (
                  <div key={i} className="relative">
                    <img
                      src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                      alt={`preview-${i}`}
                      className="h-20 w-20 object-cover rounded"
                    />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                      onClick={() => {
                        const newPreview = [...imagePreview];
                        newPreview.splice(i, 1);
                        setImagePreview(newPreview);
                        
                        // Also remove from formData if it's a new image
                        if (formData.image[i]) {
                          const newImages = [...formData.image];
                          newImages.splice(i, 1);
                          setFormData(prev => ({...prev, image: newImages}));
                        }
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
                
                <label className="h-20 w-20 border-2 border-dashed border-gray-300 rounded flex items-center justify-center cursor-pointer">
                  <svg className="w-6 h-6 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
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
              <p className="text-sm text-gray-500">Add or remove images. Click the plus icon to add new images.</p>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white p-3 rounded-md font-bold hover:bg-blue-600"
              >
                Update Ad
              </button>
              <button
                type="button"
                className="flex-1 bg-gray-300 text-gray-700 p-3 rounded-md font-bold hover:bg-gray-400"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditAds;
