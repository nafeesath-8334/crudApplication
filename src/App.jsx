import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Login from './pages/login'
import ProductDetails from './pages/productDetails'
import Register from './pages/register'
import ProtectedRoute from './provider/protectRout'
import { Provider } from 'react-redux'
import { store } from './reduxToolKit/store'
import Profile from './pages/profile'
import Category from './pages/category'
import Ads from './pages/ads'
import EditProfile from './pages/editProfile'
import ProductCard from './component/productCard'






function App() {

  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>

            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/productDetails" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
            <Route path="/register" element={<Register />} />
            <Route path="/productCard" element= {<ProductCard /> }/>
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/category" element={<ProtectedRoute><Category /></ProtectedRoute>} />
            <Route path="/ads" element={<ProtectedRoute><Ads /></ProtectedRoute>} />
            <Route path="/editProfile" element={<ProtectedRoute><EditProfile/></ProtectedRoute>} />
          </Routes>
        </Provider>

      </BrowserRouter>

    </>
  )
}

export default App
