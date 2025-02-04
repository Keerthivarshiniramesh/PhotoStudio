import React, { useContext, useRef, useState } from 'react'
import { Contextuse } from '../Providerr'
import logo from '../assets/ADS_bg_Logo.png'
import { useNavigate } from 'react-router-dom'

export default function Order() {

    let { orders } = useContext(Contextuse)
    const beurl = process.env.REACT_APP_beUrl

    let use = useNavigate()

    let [status, setStatus] = useState('Pending')
    let [dataview, setdataView] = useState(false)
    let [read, setRead] = useState(false)
    let [view, setView] = useState({

        id: '',
        customerName: "",
        email: "",
        date: '',
        contact: "",
        address: "",
        image: null,
        productId: '',
        frameName: '',
        size: {
            height: '',
            width: ''
        },
        quantity: '',
        status: ''

    })

    // Read the orders
    let Read = (i) => {

        fetch(`${beurl}fetch-order/${i}`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setView(data.order)

                }
                else {
                    alert(data.message)
                }
            })
            .catch(err => {
                console.log("Error in fetch the products", err)
                alert("Trouble in connecting to Server !!")
            })

        setdataView(false)
        setdataView(false)
        setRead(true)

    }

    const form = new FormData();

    // Edit the orders

    let Update = (i) => {
        fetch(`${beurl}fetch-order/${i}`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setView(data.order)

                }
                else {
                    alert(data.message)
                }
            })
            .catch(err => {
                console.log("Error in fetch the products", err)
                alert("Trouble in connecting to Server !!")
            })
        setRead(false)
        setdataView(true)

    }

    let Save = (e) => {
        e.preventDefault()
        fetch(`${beurl}update-order/${view.id}`, {
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

    // Delete the Orders

    let Delete = (i) => {

        fetch(`${beurl}delete-order/${i}`, {
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

    const handleDownload = (e) => {
        e.preventDefault()
        const imageUrl = `${beurl}${view.image && view.image.startsWith('/') ? view.image.slice(1) : view.image || ''}`;

        fetch(imageUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                return response.blob()
            })
            .then(blob => {
                const blobUrl = URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = blobUrl
                link.download = 'image.png' // Set the filename
                document.body.appendChild(link) // Append link to the DOM
                link.click() // Programmatically click the link to trigger download
                document.body.removeChild(link) // Clean up
                URL.revokeObjectURL(blobUrl) // Revoke the object URL
            })
            .catch(error => {
                console.error('Error downloading the image:', error)
            })
    };


    return (
        <div>
            <header className='container-fluid text-center bg-white home d-flex justify-content-center align-content-center'>
                <img src={logo} style={{ with: '50px', height: '50px' }} className='d-inline-block mt-5 pt-2' />
                <h3 className='mt-5  mb-5 text-white'>ASATHAL DIGITAL STUDIO </h3>
            </header>

            <table className="table caption-top position-relative table_order">
                <caption>List of Orders</caption>
                <thead className='table-light'>
                    <tr>
                        <th scope="col">S.No</th>
                        <th scope="col" className="d-none d-md-table-cell">Order.Id</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col" className="d-none d-md-table-cell">Contact</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders && orders.map((order, index) =>
                        (
                            <tr key={index}>
                                <th className="d-none d-md-table-cell">{index + 1}</th>
                                <td>{order.productId}</td>
                                <td>{order.customerName}</td>
                                <td className="d-none d-md-table-cell">{order.contact}</td>
                                <td><i className="bi bi-pencil-square" onClick={() => Update(order.id)}></i> </td>
                                <td><i className="bi bi-trash-fill" onClick={() => Delete(order.id)} ></i> </td>
                                <td><button className='btn btn-primary' onClick={() => Read(order.id)}>View</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>


            {/* Edit only */}
            {
                dataview &&

                <div className='popup border rounded position-absolute'>
                    <h3 className='text-center '>Products</h3>
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
                        <label className="form-label fw-bold">Contact :</label>
                        <p className='ps-3 d-inline-block'>{view.contact}</p>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Photo :</label><img
                            src={`${beurl}${view.image && view.image.startsWith('/') ? view.image.slice(1) : view.image || ''}`} alt="Photo"
                            style={{ width: '100px', height: '100px', marginLeft: '30px' }} />
                        <a href="#" className='mx-4 ' onClick={handleDownload}><i className="bi bi-download downloads"></i></a>

                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Contact :</label>
                        <p className='ps-3 d-inline-block'>{view.address}</p>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Frame Id :</label>
                        <a href='/products' className='text-dark' ><p className='ps-3 d-inline-block'>{view.productId}</p></a>
                    </div>

                    <div className="mb-3 ">
                        <label className="form-label fw-bold ">Size : </label>
                        <p className='ps-3 d-inline-block'>{`${view.size.height} * ${view.size.width}`}</p>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Quantity :</label>
                        <p className='ps-3 d-inline-block'>{view.quantity}</p>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold" >Status: </label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)} className='ms-3'>
                            <option value="Pending" >Pending</option>
                            <option value="Processed" >Processed</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Shipped">Shipped</option>

                        </select>
                    </div>

                    <div className="mb-3 buttons">
                        <button className="btn btn-primary text-center create" onClick={() => setdataView(false)}>Cancel</button>
                        <button className="btn btn-primary " onClick={(e) => Save(e)} >Save</button>
                    </div>


                </div>

            }


            {/* Read Bookings */}
            {
                read &&

                <div className='popup border rounded position-absolute'>
                    <h3 className='text-center '>Products</h3>
                    <div className='d-flex justify-content-end  fs-3 fw-bold close' onClick={() => setRead(false)}>&times;</div>


                    <div className="mb-3">
                        <label className='fw-bold '> CustomerName : </label>
                        <p className='ps-3 d-inline-block'>{view.customerName}</p>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Email :</label>
                        <p className='ps-3 d-inline-block'>{view.email}</p>
                    </div>


                    <div className="mb-3">
                        <label className="form-label fw-bold">Contact :</label>
                        <p className='ps-3 d-inline-block'>{view.contact}</p>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Photo :</label><img
                            src={`${beurl}${view.image && view.image.startsWith('/') ? view.image.slice(1) : view.image || ''}`}
                            alt="Photo"
                            style={{ width: '100px', height: '100px', marginLeft: '30px' }}
                        />


                    </div>


                    <div className="mb-3">
                        <label className="form-label fw-bold">Contact :</label>
                        <p className='ps-3 d-inline-block'>{view.address}</p>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Frame Id :</label>
                        <a href='/products' className='text-dark' ><p className='ps-3 d-inline-block'>{view.productId}</p></a>
                    </div>

                    <div className="mb-3 ">
                        <label className="form-label fw-bold ">Size : </label>
                        <p className='ps-3 d-inline-block'>{`${view.size.height} * ${view.size.width}`}</p>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Quantity :</label>
                        <p className='ps-3 d-inline-block'>{view.quantity}</p>
                    </div>


                    <div className="mb-3">
                        <div className="mb-3">
                            <label className="form-label fw-bold">Status :</label>
                            <p className='ps-3 d-inline-block'>{view.status}</p>
                        </div>
                    </div>

                    <div className="mb-3  buttons">
                        <button className="btn btn-primary text-center create" onClick={() => setRead(false)}>Cancel</button>

                    </div>
                </div>
            }
        </div >
    )
}
