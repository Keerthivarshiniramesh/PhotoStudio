
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import { useContext } from 'react';
import { Contextuse } from './Providerr';
import Product from './components/Product';
import Service from './components/Service';
import Order from './components/Order';
import Bookings from './components/Booking';
import HomePage from './components/HomePage';
import UserService from './components/UserService';
import UserProducts from './components/UserProducts';
import Denied from './components/Denied';
import Frames from './components/Frames';
import Event from './components/Event';

function App() {
  let { isadmin } = useContext(Contextuse)
  console.log(isadmin)
  const isAuth = true


  return (
    <Routes>
      <Route path='/auth' element={<Login />}></Route>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/products' element={<Product />}></Route>
      <Route path='/service' element={<Service />}></Route>
      <Route path='/order' element={<Order />}></Route>
      <Route path='/bookings' element={<Bookings />}></Route>

      <Route path='/dashboard' element={
        isAuth === true ?
          (isadmin === true ? <Home /> : <Denied />) : <Login />
      } />

      <Route path='/' element={<HomePage />}></Route>
      <Route path='/userservice' element={<UserService />}></Route>
      <Route path='/userproduct' element={<UserProducts />}></Route>
      <Route path='/userproduct/:name' element={<Frames />} />
      <Route path='/userservice/:name' element={<Event />} />
    </Routes>
  );
}

export default App;
