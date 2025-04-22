
import { useEffect, useState } from 'react';
import { getAllAds } from '../apiService/allApi';
import ProductCard from '../component/productCard';

const AllAd = () => {
  const [adds, setAdds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await getAllAds();
        setAdds(res.data);
      } catch (err) {
        console.error('Error fetching ads:', err);
      }
    };
    fetchAds();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {adds.map((adds, index) => (
        <ProductCard key={index} adds={adds} />
      ))}
    </div>
  );
};

export default AllAd;
