import React, { useEffect, useState } from 'react'
import logo from '../assets/ADS_bg_Logo.png'
import home_service from '../assets/user_services.png'
import home_products from '../assets/home_products.jpg'
import { useNavigate } from 'react-router-dom'

export default function HomePage() {

    let [visible, setVisible] = useState(false)

    let use = useNavigate()
    useEffect(() => {
        setTimeout(() => setVisible(true), 100);
    }, []);

    return (
        <div className="user_bg">
            <header className='container-fluid text-center bg-white home d-flex justify-content-center align-content-center'>
                <img src={logo} style={{ with: '50px', height: '50px' }} className='d-inline-block mt-5 pt-2' />
                <h3 className='mt-5  mb-5 text-white'>ASATHAL DIGITAL STUDIO </h3>
            </header>

            <div className="m-4">
                <div className="d-flex flex-column justify-content-center align-items-center thin">
                    <p className={`text-center fw-bold ${visible ? "fades" : ""}`} id="shop">
                        Welcome to <span>ASATHAL DIGITAL STUDIO</span> </p>
                </div>
                <div className="m-5">
                    <p className="text-center content">
                        At Asathal Digital Studio, we believe every moment tells a story, and our mission is to capture yours with creativity,
                        precision, and heart. Whether it's a cherished family portrait, a stunning wedding shoot, or professional
                        branding photography, we specialize in turning fleeting moments into timeless memories.
                    </p>
                </div>
            </div>

            <div className="fade-line"></div>

            <div className="m-5">
                <p className="text-center thin">About Products</p>

                <div className="row align-items-center">
                    <div className="col-12 col-md-6 text-center mt-4">
                        <p className="content">
                            This frame holds a moment frozen in time, a memory etched in light, a story waiting to be told, a feeling that never fades, and a treasure meant to last forever.
                        </p>
                        <button className="btn rounded border mt-3 view" onClick={() => use('/userproduct')}>View Products..</button>
                    </div>
                    <div className="col-12 col-md-6 text-center">
                        <img
                            src={home_products}
                            className="img-fluid"
                            alt="Products"
                        />
                    </div>
                </div>
            </div>

            <div className="fade-line"></div>

            <div className="m-5">
                <p className="text-center thin">About Services</p>

                <div className="row align-items-center">
                    <div className="col-12 col-md-6 text-center">
                        <img src={home_service} className="img-fluid" alt="Services" />
                    </div>
                    <div className="col-12 col-md-6 text-center mt-4">
                        <p className="content">
                            With expertise in both photography and videography, we create
                            a seamless blend of still moments and moving stories, tailored to your unique needs.
                        </p>
                        <button className="btn rounded border mt-3 view" onClick={() => use('/userservice')}> View Services..</button>
                    </div>

                </div>
            </div>

            <footer className="text-white">
                <div className="d-flex flex-column flex-md-row justify-content-around align-items-center bg-secondary f1 p-4">
                    <div className="mb-4 mb-md-0">
                        <i className="bi bi-geo-alt-fill d-inline-block"><p className='d-inline-block ms-2'>14/2, Sasthiri Salai, Surampatti Valasu, Erode - 638009</p></i>
                        <br></br><i className="bi bi-telephone-fill" />
                        <p className='d-inline-block ms-2'>9842798919</p>
                        <br></br> <i className="bi bi-envelope-fill"></i>
                        <p className='d-inline-block ms-2'>Asathaldigitalstudio@gmail.com</p>
                    </div>
                    <div className="  " >
                        <p>Follow Us</p>
                        <i className="bi bi-facebook m-2 "></i>
                        <i className="bi bi-instagram m-2"></i>
                        <i className="bi bi-whatsapp m-2"></i>
                        <i className="bi bi-google m-2"></i>
                    </div>
                </div>
            </footer>

        </div>

    )
}