import React from 'react'
import logo from '../assets/ADS_bg_Logo.png'
export default function Denied() {
    return (
        <div className='user_bg'>
            <header className='container-fluid text-center home d-flex justify-content-center align-content-center'>
                <img src={logo} style={{ with: '50px', height: '50px' }} className='d-inline-block mt-5 pt-2' />
                <h3 className='mt-5  mb-5 text-white'>ASATHAL DIGITAL STUDIO </h3>
            </header>
            <div className='text-center  d-flex justify-content-center align-content-center thin'>
                <p className='text-center text-black'>Oops ! You Can't access this page ......</p>

            </div>
        </div>
    )
}
