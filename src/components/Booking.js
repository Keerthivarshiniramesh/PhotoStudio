import React, { useContext, useState } from 'react'
import { Contextuse } from '../Providerr'
import logo from '../assets/ADS_bg_Logo.png'


export default function Bookings() {

    let { bookings } = useContext(Contextuse)

    const beurl = process.env.REACT_APP_beUrl


    let [status, setStatus] = useState('Pending')
    let [dataview, setdataView] = useState(false)
    let [read, setread] = useState(false)
    let [view, setView] = useState({

        id: '',
        customerName: '',
        contact: '',
        email: '',
        address: '',
        startDate: '',
        endDate: '',
        serviceId: '',
        status: ''

    })

    // Delete the Bookings
    let Delete = (i) => {

        fetch(`${beurl}delete-booking/${i}`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    alert(data.message)
                    window.location.reload()
                }
                else {
                    alert(data.message)
                }
            })
            .catch(err => {
                console.log("ERR", err)
                alert("Trouble in connecting to the Server !!!")
            })

    }

    // View the Bookings
    let Read = (i) => {

        fetch(`${beurl}fetch-booking/${i}`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setView(data.booking)

                }
                else {
                    alert(data.message)
                }
            })
            .catch(err => {
                console.log("Error in fetch the products", err)
                alert("Trouble in connecting to Server !!")
            })
        setread(true)
        setdataView(false)
    }

// Edit the Bookings

    let Update = (i) => {

        fetch(`${beurl}fetch-booking/${i}`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setView(data.booking)

                }
                else {
                    alert(data.message)
                }
            })
            .catch(err => {
                console.log("Error in fetch the products", err)
                alert("Trouble in connecting to Server !!")
            })

        setdataView(true)
        setread(false)
    }




    let Save = (e) => {
        e.preventDefault()

        console.log("Id is", view.id)
        console.log(status)
        fetch(`${beurl}update-booking/${view.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ status })

        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    alert(data.message)
                    window.location.reload()
                }
                else {
                    alert(data.message)
                }
            })
            .catch(err => {
                console.log("Error in Update the products", err)
                alert("Trouble in connecting to Server !!")
            })



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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings && bookings.map((book, index) =>
                        (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td className="d-none d-md-table-cell">{book.serviceId}</td>
                                <td className="d-none d-md-table-cell">{book.email}</td>
                                <td>{book.customerName}</td>
                                <td className="d-none d-md-table-cell">{book.contact}</td>
                                <td><i className="bi bi-pencil-square" onClick={() => Update(book.id)}></i> </td>
                                <td><i className="bi bi-trash-fill" onClick={() => Delete(book.id)} ></i> </td>
                                <td><button className='btn btn-primary' onClick={() => Read(book.id)}>View</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>


            {/* Edit Booking */}
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
                        <label className="form-label fw-bold">Service Id :</label>
                        <a href='/service' className='text-dark' ><p className='ps-3 d-inline-block'>{view.serviceId}</p></a>
                    </div>


                    <div className="mb-3">
                        <label className="form-label fw-bold" >Status: </label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} className='ms-3'>
                            <option value="Accept" >Accept</option>
                            <option value="Pending" >Pending</option>
                            <option value="Reject">Reject</option>

                        </select>
                    </div>

                    <div className="mb-3  buttons">
                        <button className="btn btn-primary text-center create" onClick={() => setdataView(false)}>Cancel</button>
                        <button className="btn btn-primary  " onClick={(e) => Save(e)} >Save</button>
                    </div>


                </div>

            }


            {/* Read Bookings */}
            {
                read &&

                <div className='popup border rounded position-absolute'>
                    <h3 className='text-center '>Service</h3>
                    <div className='d-flex justify-content-end  fs-3 fw-bold close' onClick={() => setread(false)}>&times;</div>


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
                        <label className="form-label fw-bold">Address :</label>
                        <p className='ps-3 d-inline-block'>{view.address}</p>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Service Id :</label>
                        <a href='/service' className='text-dark' ><p className='ps-3 d-inline-block'>{view.serviceId}</p></a>
                    </div>


                    <div className="mb-3">
                        <div className="mb-3">
                            <label className="form-label fw-bold">Status :</label>
                            <p className='ps-3 d-inline-block'>{view.status}</p>
                        </div>
                    </div>

                    <div className="mb-3  buttons">
                        <button className="btn btn-primary text-center create" onClick={() => setread(false)}>Cancel</button>

                    </div>
                </div>
            }
        </div >
    )
}
