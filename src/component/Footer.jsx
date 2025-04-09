
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-slate-600 ">
      <div className=" mx-auto py-8 grid grid-cols-5 gap-2 ">


        <div>
          <h4 className="font-semibold mb-4 text-gray-600">Popular Locations</h4>
          <ul className="text-sm">
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Kolkatta
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Pune
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Chennai
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Mumbai
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-gray-600">Trending Locations</h4>
          <ul className="text-sm">
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Bhuvaneshwar
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Hydrabad
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Nashik
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Chadhigrah
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-gray-600">About Us</h4>

          <a href="#" className="hover:underline">Tech@OLX</a>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-gray-600">Olx</h4>

          <ul className="text-sm">
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Blog
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Help
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Sitemap
              </a>
            </li>

          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-gray-600">Follow Us</h4>
          <div className='flex space-x-3 items-center my-3'>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clip-rule="evenodd" />
            </svg>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M22 5.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.343 8.343 0 0 1-2.605.981A4.13 4.13 0 0 0 15.85 4a4.068 4.068 0 0 0-4.1 4.038c0 .31.035.618.105.919A11.705 11.705 0 0 1 3.4 4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 6.1 13.635a4.192 4.192 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 2 18.184 11.732 11.732 0 0 0 8.291 20 11.502 11.502 0 0 0 19.964 8.5c0-.177 0-.349-.012-.523A8.143 8.143 0 0 0 22 5.892Z" clip-rule="evenodd" />
            </svg>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path fill="currentColor" fill-rule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd" />
            </svg>
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z" clip-rule="evenodd" />
            </svg>


          </div>


          <img src="appstore.jpg" className='w-40'>
          </img>
          <img src="playstore.jpg" className="w-40 mt-3">
          </img>
        </div>

      </div>

    </footer>
  )



}

export default Footer

