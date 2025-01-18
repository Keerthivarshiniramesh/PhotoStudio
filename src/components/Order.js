import React, { useContext, useRef, useState } from 'react'
import { Contextuse } from '../Providerr'
import logo from '../assets/ADS_bg_Logo.png'
import { useNavigate } from 'react-router-dom'

export default function Order() {

    let { orders, setOrder } = useContext(Contextuse)

    let use = useNavigate()

    let [status, setStatus] = useState('Processed')
    let [dataview, setdataView] = useState(false)
    let [view, setView] = useState({

        id: '',
        customerName: "",
        email: "",
        date: '',
        contact: "",
        address: "",
        photo: "",
        productId: '',
        frameName: '',
        size: {
            height: '',
            width: ''
        },
        quantity: '',

    })


    let Read = (i) => {
        if (orders[i]) {
            let one = orders[i]
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
        else {

        }
    }

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
                        <th scope="col">Date</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col" className="d-none d-md-table-cell">Contact</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders && orders.map((order, index) =>
                        (
                            <tr key={index}>
                                <th className="d-none d-md-table-cell">{order.id}</th>
                                <td>{order.productId}</td>
                                <td>{order.date}</td>
                                <td>{order.customerName}</td>
                                <td className="d-none d-md-table-cell">{order.contact}</td>
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
                        <label className="form-label fw-bold">Date :</label>
                        <p className='ps-3 d-inline-block'>{view.date}</p>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Contact :</label>
                        <p className='ps-3 d-inline-block'>{view.contact}</p>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Photo :</label><img src={view.photo} alt='Photo' style={{ width: '100px', height: '100px', marginLeft: "30px" }} download />

                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Contact :</label>
                        <p className='ps-3 d-inline-block'>{view.address}</p>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Frame Name :</label>
                        <a href='/products' className='text-dark' ><p className='ps-3 d-inline-block'>{view.frameName}</p></a>
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
                            <option value="Cancelled">Cancelled</option>

                        </select>
                    </div>

                    <div className="mb-3 buttons">
                        <button className="btn btn-primary text-center create" onClick={() => setdataView(false)}>Cancel</button>
                        <button className="btn btn-primary " onClick={(e) => Save(e)} >Save</button>
                    </div>


                </div>

            }
        </div >
    )
}
