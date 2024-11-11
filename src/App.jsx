import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Shops from './pages/Shops';
import Card from './pages/Card';
import Shipping from './pages/Shipping';
import Details from './pages/Details';
import Login from './pages/Login';
import Register from './pages/Register';
import { get_category } from './store/reducers/homeReducer';
import { useDispatch} from 'react-redux';
import CategoryShop from './pages/CategoryShop';
import SearchProducts from './pages/SearchProducts';
import VerifyEmail from './pages/VerifyEmail';
import OTPVerification from './pages/OTPVerification';
import PasswordReset from './pages/PasswordReset';
import Payment from './pages/Payment';
import Dashboard from './pages/Dashboard';
import ProtectUser from './utils/ProtectUser';
import Index from './components/dashboard/Index';
import Orders from './components/dashboard/Orders';
import ChangePassword from './components/dashboard/ChangePassword';
import Wishlist from './components/dashboard/Wishlist';
import History from './components/dashboard/History';
import OTP from './components/dashboard/OTP';
import Profile from './components/dashboard/Profile';
import EditProfile from './components/dashboard/EditProfile';
import Address from './components/dashboard/Address';
import AddAddress from './components/dashboard/Address/AddAddress';
import UpdateAddress from './components/dashboard/Address/UpdateAddress';


function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(get_category()) 
},[])

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/verify-email' element={<VerifyEmail/>} />
      <Route path='/otp/:id' element={<OTPVerification/>} />
      <Route path='/passwordreset' element={<PasswordReset/>} />
      <Route path='/register' element={<Register/>} />
      <Route path='/shops' element={<Shops/>} />
      <Route path='/card' element={<Card/>} />
      <Route path='/shipping' element={<Shipping/>} />
      <Route path='/payment' element={<Payment/>} />
      <Route path='/products?' element={<CategoryShop/>} />
      <Route path='/products/search?' element={<SearchProducts/>} />
      <Route path='/products/:_id' element={<Details/>} /> 



      <Route path='/dashboard' element={<ProtectUser/>} >
      <Route path='' element={<Dashboard/>} >
      <Route path='' element={<Index/>} />
      <Route path='my-orders' element={<Orders/>} />
      <Route path='profile' element={<Profile/>} />
      <Route path='Edit-profile' element={<EditProfile/>} />
      <Route path='change-password' element={<ChangePassword/>} /> 
      <Route path='otp/:id' element={<OTP/>} /> 
      <Route path='my-wishlist' element={<Wishlist/>} /> 
      <Route path='history' element={<History/>} /> 
      <Route path='address' element={<Address/>} />
      <Route path='add-address' element={<AddAddress/>} /> 
      <Route path='update-address/:_id' element={<UpdateAddress/>} />
       </Route> 
      </Route>

    </Routes>
    
    </BrowserRouter>
  );
}

export default App;