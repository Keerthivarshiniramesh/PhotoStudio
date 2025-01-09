import React, { useCallback, useContext } from 'react'
import logo from '../assets/ADS_bg_Logo.png'
import { Contextuse } from '../Providerr'
import { useParams } from 'react-router-dom'
export default function Event() {
    let { services, setServices } = useContext(Contextuse)

    let { name } = useParams()

    let current = services.find((service) => service.name === name)
    return (
        <div className='user_bg'>
            <header className='container-fluid text-center bg-white home d-flex justify-content-center align-content-center'>
                <img src={logo} style={{ with: '50px', height: '50px' }} className='d-inline-block mt-5 pt-2' />
                <h3 className='mt-5  mb-5 text-white'>ASATHAL DIGITAL STUDIO </h3>
            </header>
            <main className="d-flex flex-wrap justify-content-around align-items-center m-4">
                <p>{current.name}</p>
                <img src={current.coverPhoto} />

            </main>
        </div>
    )
}
