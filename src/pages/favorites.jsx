  import { useState, useEffect } from "react";
 import {  getAllAds, getUserFavorites } from "../apiService/allApi";
 import ProductCard from "../component/productCard";

 const Favorites = ({userId}) => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const userCredentials = localStorage.getItem("userCredentials");
      if (!userCredentials) {
        alert("User not logged in");
        return;
      }

    const parsedCredentials = JSON.parse(userCredentials);
      const userId = parsedCredentials.userId;

       try {
         const { favorites: favoriteAdIds } = await getUserFavorites(userId);
         const allProducts = await getAllAds();
         const filtered = allProducts.filter(p => favoriteAdIds.includes(p.adId));
         setFavoriteProducts(filtered);       } catch (error) {
         console.error("Error fetching favorites:", error);       }
    };

    fetchFavorites();
  }, [userId]);

   return (
     <div>
       <h1>Your Favorite Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {favoriteProducts.map(product => (
          <ProductCard key={product.adId} product={product} />
        ))}
      </div>
    </div>
   );
};

 export default Favorites;

