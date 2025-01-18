import React from 'react'
import logo from '../assets/ADS_bg_Logo.png'
function Loading() {
  return (
    <div className='user_bg'>
      <header className='container-fluid text-center home d-flex justify-content-center align-content-center'>
        <img src={logo} style={{ with: '50px', height: '50px' }} className='d-inline-block mt-5 pt-2' />
        <h3 className='mt-5  mb-5 text-white'>ASATHAL DIGITAL STUDIO </h3>
      </header>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <p></p><span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div >

  )
}

export default Loading