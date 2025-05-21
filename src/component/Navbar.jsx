import { useState, useEffect } from "react";
import { search, searchLocation } from "../apiService/allApi"
import { Link, useNavigate } from "react-router";
const Navbar = ({ setSearchResult }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [queryItem, setQueryItem] = useState('');
  const [queryLocation, setQueryLocation] = useState('');

  const [results, setResults] = useState([]);
  const [isLoggIn, setIsLoggIn] = useState()
  const navigate = useNavigate()


  // Toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const handleSearchChange = async (e) => {
    const searchQuery = e.target.value;
    setQueryItem(searchQuery);

    if (searchQuery.trim() === '') {
      setResults([]);
      return;
    }

    try {
      const data = await search(searchQuery);
      console.log(data.data.items);
      setSearchResult(data.data.items);
    } catch (error) {
      console.error('Error fetching item search results:', error);
      setResults([]);
    }
  };

  const handleSearchChangeLoc = async (e) => {
    const searchQueryL = e.target.value;
    setQueryLocation(searchQueryL);

    if (searchQueryL.trim() === '') {
      setResults([]);
      return;
    }

    try {
      const data = await searchLocation(searchQueryL);
      console.log(data.data.items);
      setSearchResult(data.data.items);
    } catch (error) {
      console.error('Error fetching location search results:', error);
      setResults([]);
    }
  };

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    setIsLoggIn(!!userToken);
  }, []);
  // Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".dropdown")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);
  const logout = () => {
    localStorage.removeItem("userCredentials")
    navigate("/login")
    setIsLoggIn(false)
  }

  return (
    <nav className="sticky top-0 bg-gray-100 text-black p-1 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <img src="download.jpg" className="w-16 h-16" alt="Logo" onClick={()=>navigate("/Home")} />

        <div className="flex items-center border border-2 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <input
            type="text"
            placeholder="Search for locations..."
            className="px-4 py-2"
            value={queryLocation}
            onChange={handleSearchChangeLoc}

          />
          <button className="p-2" >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center border rounded-lg relative">
          <input
            type="text"
            placeholder="Search for items"
            className="px-4 py-2 w-full"
            value={queryItem}
            onChange={handleSearchChange}
          />
          <div className="relative">
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
            
          </div>
        </div>

        

        <div>
          <button onClick={()=>navigate("/favorites")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
        </div>

        <div className="underline font-semibold">
          <a href="/profile">Profile</a>
        </div>
        <div className="underline font-semibold">
          {isLoggIn ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>

        <div className="flex items-center border rounded font-semibold">
          <button className="flex items-center p-2" onClick={()=>navigate("/category")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            <span className="ml-2">SELL</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;