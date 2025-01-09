import React, { useEffect } from 'react'
import order from '../assets/order.png'
import book from '../assets/bookings.png'
import product from '../assets/products.jpg'
import service from '../assets/services.png'
import logo from '../assets/ADS_bg_Logo.png'
export default function Home() {

    useEffect(() => {
       
    }, [])
    return (
        <div className=''>
            <header className='container-fluid text-center bg-white home d-flex justify-content-center align-content-center'>
                <img src={logo} style={{ with: '50px', height: '50px' }} className='d-inline-block mt-5 pt-2' />
                <h3 className='mt-5  mb-5 text-white'>ASATHAL DIGITAL STUDIO </h3>
            </header>

            <main className='d-flex justify-content-around align-items-center mt-5 cards'>
                <div className="card" style={{ width: "190px", height: "200px" }}>
                    <img src={order} className="card-img-top" alt="..." />
                    <div className="card-body">

                        <a href="/order" className="btn btn-primary ms-4 mt-3">Order</a>
                    </div>
                </div>
                <div className="card" style={{ width: "190px", height: "200px" }}>
                    <img src={book} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <a href="/bookings" className="btn btn-primary ms-4  mt-3">Bookings</a>
                    </div>
                </div>
                <div className="card" style={{ width: "190px", height: "200px" }}>
                    <img src={product} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <a href="/products" className="btn btn-primary ms-4  mt-3">Products</a>
                    </div>
                </div>

                <div className="card" style={{ width: "190px", height: "190px" }}>
                    <img src={service} className="card-img-top" alt="..." />
                    <div className="card-body">

                        <a href="/service" className="btn btn-primary ms-4" style={{ marginTop: "70px " }}>Services</a>
                    </div>
                </div>
            </main>
        </div>
    )
}
