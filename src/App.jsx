import React, { useContext } from 'react'
import Menubar from './components/Menubar/Menubar.jsx'
import Home from './pages/Home/Home.jsx'
import { Route, Routes } from 'react-router-dom'
import Contact from './pages/Contact/Contact.jsx'
import ExploreFood from './pages/Explore/ExploreFood.jsx'
import FoodDetails from './pages/FoodDetails/FoodDetails.jsx'
import Cart from './pages/Cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Login from './components/Login/Login.jsx'
import Register from './components/Register/Register.jsx'
import { ToastContainer} from 'react-toastify'
import MyOrders from './pages/MyOrders/MyOrders.jsx'
import { StoreContext } from './context/StoreContext.jsx'
import ChefAI from './pages/ChefAI/ChefAI.jsx'


const App = () => {
  const{token} = useContext(StoreContext);
  return (
    <div>
      <Menubar/>
      <ToastContainer />
      {/* Add your routes here */}
     
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/explore" element={<ExploreFood/>} />
        <Route path='/food/:id' element={<FoodDetails/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/order' element={token ? <PlaceOrder/> :<Login/>}></Route>
        <Route path='/login' element={token ? <Home/> :<Login/>}></Route>
        <Route path='/register' element={token ? <Home/> :<Register/>}></Route>
        <Route path='/myorders' element={token ? <MyOrders/> :<Login/>}></Route>
        <Route path="/chefai" element={token ? <ChefAI/> :<Login/>}></Route>
        
        {/* Add more routes as needed */}

      </Routes>
      </div>
  )
}

export default App