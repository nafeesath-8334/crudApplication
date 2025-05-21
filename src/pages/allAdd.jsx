
import { useEffect, useState } from 'react';
import { getAllAds } from '../apiService/allApi';
import ProductCard from '../component/productCard';

const AllAd = ({ searchResult }) => {
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
    if (searchResult?.length > 0) {
      setAdds(searchResult)
    } else {
      fetchAds()
    }
    // fetchAds();
    console.log(searchResult)
  }, [searchResult]);

  return (
    <div className="flex justify-center items-center p-12"> <div className="p-6">
      <div className="grid grid-cols-1 gap-6">
        {adds.map((ad, index) => (
          <ProductCard key={index} adds={ad} />
        ))}
      </div>
    </div></div>


  );
};

export default AllAd;
