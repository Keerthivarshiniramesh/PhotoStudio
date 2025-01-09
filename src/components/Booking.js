import React, { useContext, useRef, useState } from 'react'
import { Contextuse } from '../Providerr'
import logo from '../assets/ADS_bg_Logo.png'
import { useNavigate } from 'react-router-dom'

export default function Bookings() {

    let { bookings, setBookings } = useContext(Contextuse)

    let use = useNavigate()

    let [status, setStatus] = useState('Processed')
    let [dataview, setdataView] = useState(false)
    let [view, setView] = useState({

        id: '',
        customerName: '',
        contact: '',
        email: '',
        address: '',
        startDate: '',
        endDate: '',
        serviceId: '',
        serviceName: '',
        status: ''

    })


    let Read = (i) => {
        if (bookings[i]) {
            let one = bookings[i]
            setView(one)
            console.log(view)
            setdataView(true)
        }

    }

    const form = new FormData();

    let Save = (e) => {
        e.preventDefault()

        if (status !== '') {

            form.append('status', status)
            console.log(status)
        }

    }

    return (
        <div>
            <header className='container-fluid text-center bg-white home d-flex justify-content-center align-content-center'>
                <img src={logo} style={{ with: '50px', height: '50px' }} className='d-inline-block mt-5 pt-2' />
                <h3 className='mt-5  mb-5 text-white'>ASATHAL DIGITAL STUDIO </h3>
            </header>

            <table className="table caption-top position-relative table_order">
                <caption>List of Services</caption>
                <thead className='table-light'>
                    <tr>
                        <th scope="col">S.No</th>
                        <th scope="col" className="d-none d-md-table-cell">Service.Id</th>
                        <th scope="col" className="d-none d-md-table-cell">Email</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col" className="d-none d-md-table-cell">Contact</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings && bookings.map((book, index) =>
                        (
                            <tr key={index}>
                                <th>{book.id}</th>
                                <td className="d-none d-md-table-cell">{book.serviceId}</td>
                                <td className="d-none d-md-table-cell">{book.email}</td>
                                <td>{book.customerName}</td>
                                <td className="d-none d-md-table-cell">{book.contact}</td>
                                <td><button className='btn btn-primary' onClick={() => Read(index)}>View</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>


            {/* Read only */}
            {
                dataview &&

                <div className='popup border rounded position-absolute'>
                    <h3 className='text-center '>Service</h3>
                    <div className='d-flex justify-content-end  fs-3 fw-bold close' onClick={() => setdataView(false)}>&times;</div>


                    <div className="mb-3">
                        <label className='fw-bold '> CustomerName : </label>
                        <p className='ps-3 d-inline-block'>{view.customerName}</p>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Email :</label>
                        <p className='ps-3 d-inline-block'>{view.email}</p>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Start Date :</label>
                        <p className='ps-3 d-inline-block'>{view.startDate}</p>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">End Date :</label>
                        <p className='ps-3 d-inline-block'>{view.endDate}</p>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Contact :</label>
                        <p className='ps-3 d-inline-block'>{view.contact}</p>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Contact :</label>
                        <p className='ps-3 d-inline-block'>{view.address}</p>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Service Name :</label>
                        <a href='/service' className='text-dark' ><p className='ps-3 d-inline-block'>{view.serviceName}</p></a>
                    </div>


                    <div className="mb-3">
                        <label className="form-label fw-bold" >Status: </label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} className='ms-3'>
                            <option value="Accept" >Accept</option>
                            <option value="Processed" >Processed</option>
                            <option value="Reject">Reject</option>

                        </select>
                    </div>

                    <div className="mb-3  buttons">
                        <button className="btn btn-primary text-center create" onClick={() => setdataView(false)}>Cancel</button>
                        <button className="btn btn-primary float-end create" onClick={(e) => Save(e)} >Save</button>
                    </div>


                </div>

            }
        </div >
    )
}
