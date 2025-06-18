import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store } from './reduxToolKit/store'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Login from './pages/login'
import ProductDetails from './pages/productDetails'
import Register from './pages/register'
import ProtectedRoute from './provider/protectRout'

import Profile from './pages/profile'
import Category from './pages/category'
import Ads from './pages/ads'
import EditProfile from './pages/editProfile'
import ProductCard from './component/productCard'
import AllAd from './pages/allAdd'

import EditAds from './pages/editAd'
import ForgotPassword from './pages/forgotPassword'
import ResetPassword from './pages/resetPassword'


import Favorites from './pages/favorites'






function App() {

  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path='/forgotpassword' element={<ForgotPassword />} ></Route>
            <Route path='/resetPassword' element={<ResetPassword />} ></Route>
            {/* <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} /> */}
            <Route path="/Home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/" element={<ProtectedRoute><Login/></ProtectedRoute>} />

            <Route path="/productDetails/:adId" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />

            <Route path="/productCard" element={<ProtectedRoute><ProductCard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/category" element={<ProtectedRoute><Category /></ProtectedRoute>} />
            <Route path="/ads" element={<ProtectedRoute><Ads /></ProtectedRoute>} />
            <Route path="/editProfile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
            <Route path="/allAd" element={<ProtectedRoute><AllAd /></ProtectedRoute>} />
            <Route path="/editAd/:adId" element={<ProtectedRoute><EditAds /></ProtectedRoute>} ></Route>
            <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} ></Route>

          </Routes>
        </Provider>

      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
