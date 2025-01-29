
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

  // const BeUrl = process.env.REACT_APP_beUrl

  // console.log("url:", BeUrl)

  // const newUser = { name: "John", email: "john@example.com", role: "admin", password: "password123" }

  // fetch(`${BeUrl}create-user`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Accept": "application/json"
  //   },
  //   body: JSON.stringify(newUser)
  // })
  // .then(res => res.json())
  // .then(data => {
  //   console.log("Received data in Add User:", data)
  //   if (data.success===true) {
  //     fetchUsers()
  //   }
  // })
  // .catch(err => {
  //   console.log("Trouble in adding User:", err)
  //   alert("Trouble connecting to Server!")
  // })


  // const fetchUsers = () => {
  //   fetch(`${BeUrl}fetch-users`)
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log("fetched Users: ",data)
  //   })
  //   .catch(err => {
  //     console.log("Trouble in adding User:", err)
  //     alert("Trouble connecting to Server!")
  //   })
  // }

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
      <Route path='/userproduct/:id' element={<Frames />} />
      <Route path='/userservice/:id' element={<Event />} />
    </Routes>
  );
}

export default App;


// useEffect(() => {
//     if (products) {

//     }
// }, [products])
// || currentIndex === null || !products
// if (id) {
//   if (current) {

//     setCurrentIndex(current.id)
//   }
// }