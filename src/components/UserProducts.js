import React, { useContext } from 'react'
import logo from '../assets/ADS_bg_Logo.png'
import { Contextuse } from '../Providerr'

export default function UserProducts() {

    let { products } = useContext(Contextuse)

    return (
        <div className='user_bg'>
            <header className='container-fluid text-center bg-white home d-flex justify-content-center align-content-center'>
                <img src={logo} style={{ with: '50px', height: '50px' }} className='d-inline-block mt-5 pt-2' />
                <h3 className='mt-5  mb-5 text-white'>ASATHAL DIGITAL STUDIO </h3>
            </header>

            <div className="m-4">
                <div className="d-flex flex-column justify-content-center align-items-center thin">
                    <p className={`text-center text-black`}>
                        Products </p>
                </div>
                <div className="m-5">
                    <p className="text-center content">
                        This frame holds a moment frozen in time, a memory etched in light, a story
                        waiting to be told, a feeling that never fades, and a treasure meant to last forever.
                    </p>
                </div>
            </div>

            <main className="d-flex flex-wrap justify-content-around align-items-center m-4">
                {products.map((product, index) => (
                    <div className="card m-3" style={{ width: "100%", maxWidth: "350px" }} key={index}>
                        <img src={product.coverPhoto} className="card-img-top" style={{ height: "200px", objectFit: "cover" }}
                            alt={product.name} />
                        <div className="card-body">
                            <h5 className="card-title text-primary">{product.name}</h5>
                            <p className="card-text">{product.stock}</p>
                            <a href="/order" className="btn rounded border view"> View ...</a>
                        </div>
                    </div>
                ))}
            </main>


            <footer>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-secondary f1 pt-4">
                    <div className="text-center mb-4 mb-md-0" style={{ marginLeft: '300px' }}>
                        <i className="bi bi-geo-alt-fill"></i><p>Location</p>
                        <i className="bi bi-telephone-fill"></i><p>Phone</p>
                        <i className="bi bi-envelope-fill"></i><p>Email</p>
                    </div>
                    <div className="text-center " style={{ marginRight: '300px' }}>
                        <p>Follow Us</p>
                        <i className="bi bi-facebook m-2"></i>
                        <i className="bi bi-instagram m-2"></i>
                        <i className="bi bi-whatsapp m-2"></i>
                        <i className="bi bi-google m-2"></i>
                    </div>
                </div>
            </footer>
        </div >
    )
}
