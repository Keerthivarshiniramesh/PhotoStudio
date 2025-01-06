
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

function App() {
  let { isadmin } = useContext(Contextuse)


  return (
    <Routes>
      <Route path='/auth' element={<Login />}></Route>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/products' element={<Product />}></Route>
      <Route path='/service' element={<Service />}></Route>
      <Route path='/order' element={<Order />}></Route>
      <Route path='/bookings' element={<Bookings />}></Route>
    </Routes>
  );
}

export default App;
