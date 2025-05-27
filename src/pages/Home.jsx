
import { useEffect, useState } from "react";
import Footer from "../component/Footer"
import Navbar from "../component/Navbar"

import AllAd from "./allAdd";

const Home=()=>{
     const [searchResult, setSearchResult] = useState([]);
    
      useEffect(() => {
        console.log(searchResult)
         
       }, [searchResult]);
   
    return(
        <>
        <Navbar setSearchResult={setSearchResult}/>
       {/* <div className="flex justify-center items-center p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6"> */}
       <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-16">
      <AllAd searchResult={searchResult}/>
      </div>
    {/* </div> */}
               
          
        <Footer />
        </>
    )
}
export default Home