import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const Dropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (e) => {
    if (!e.target.closest(".dropdown")) {
      setIsOpen(false);
    }
  };

  // Attach event listener to detect clicks outside
  document.addEventListener("click", closeDropdown);
    

  return (
    <nav className="sticky top-0 bg-gray-100 text-black p-1 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <img src="download.jpg" className="w-20 h-20" alt="Logo" />

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
          />
          <button className="p-2">
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

        <div className="flex items-center border rounded-lg">
          <input
            type="text"
            placeholder="Search for items"
            className="px-4 py-2 w-full"
          />
          <div>
            <button >
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

        <div className="relative dropdown">
          <button  onClick={Dropdown} className="flex items-center">
            <span className="mr-1">ENGLISH</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
         {isOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg">
              <a href="/" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">English</a>
              <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-blue-100">Hindi</a>
            </div>
          )}
        </div>

        <div>
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
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </button>
        </div>

        <div className="underline font-semibold">
        
        <a href="/profile">Profile</a>
      </div>
        <div className="underline font-semibold">
        
          <a href="/login">Login</a>
        </div>

        <div className="flex items-center border rounded font-semibold">
          <button className="flex items-center p-2">
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
  )
}

export default Navbar
