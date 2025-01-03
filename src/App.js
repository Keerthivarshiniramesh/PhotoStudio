
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import { useContext } from 'react';
import { Contextuse } from './Providerr';
import Product from './components/Product';

function App() {
  let { isadmin } = useContext(Contextuse)

 
  return (
    <Routes>
      <Route path='/auth' element={<Login />}></Route>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/products' element={<Product />}></Route>
    </Routes>
  );
}

export default App;
