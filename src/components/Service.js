import React, { useContext, useEffect, useRef, useState } from 'react'
import { Contextuse } from '../Providerr';
import logo from '../assets/ADS_bg_Logo.png'
export default function Service() {

    let { services, setServices } = useContext(Contextuse)

    let [create, setCreate] = useState({

        name: '',
        description: '',
        coverPhoto: null,
        price: ''

    })
    let [cancel, setCancel] = useState(false)
    let [list, setlist] = useState(false)
    let [dataview, setdataView] = useState(false)
    let [view, setView] = useState({

        name: '',
        description: '',
        coverPhoto: null,
        price: ''
    })


    let widthRef = useRef(null)

    let Views = (i) => {
        if (services[i]) {
            let one = services[i]
            setView(one)
            console.log(view)
            setlist(true)


        }
        else {
            console.error('Product not found at index:', i);
        }

    }
    let Read = (i) => {
        if (services[i]) {
            let one = services[i]
            setView(one)
            console.log(view)
            setdataView(true)

        }


    }


    const form = new FormData();
    let Store = (e, keys) => {

        let values = e.target.value
        let types = e.target.type
        let file = e.target.files

        if (types === 'file' && file.length > 0) {
            setCreate(prev => (
                {
                    ...prev,
                    [keys]: file[0]
                }))
        }
        else {
            setCreate(prev => (
                {
                    ...prev,
                    [keys]: values
                }))
        }
        console.log(view)
    }

    let Save = (e) => {
        e.preventDefault()
        let id;
        if (services.length === 0) {
            id = 1
        }
        else {
            let lastPro = services.slice(-1)
            id = lastPro[0].id + 1
        }

        if (id !== '' || create.name !== '' || create.description !== '' || create.coverPhoto !== '' || create.price !== '') {
            form.append('id', id)
            form.append('name', create.name)
            form.append('description', create.description)
            form.append('coverPhoto', create.coverPhoto)
            form.append('price', create.price)

        }
        else {

        }
    }


    let Edit = (e) => {
        e.preventDefault()
        setServices((prev) =>
            prev.map((service) =>
                service.id === view.id ? { ...service, ...view } : service
            ))
    }
    return (
        <div>
            <header className='container-fluid text-center bg-white home d-flex justify-content-center align-content-center'>
                <img src={logo} style={{ with: '50px', height: '50px' }} className='d-inline-block mt-5 pt-2' />
                <h3 className='mt-5  mb-5 text-white'>ASATHAL DIGITAL STUDIO </h3>
            </header>

            <button className='btn btn-primary m-5 float-end create' onClick={() => setCancel(true)} >Create Services</button>

            <table className="table caption-top position-relative">
                <caption>List of Services</caption>
                <thead className='table-light'>

                    <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Name</th>
                        <th scope="col">CoverPhoto</th>
                        <th scope="col">Price</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        services && services.map((ser, index) =>
                        (
                            <tr key={index}>
                                <th>{ser.id}</th>
                                <td>{ser.name}</td>
                                <td><img src={ser.coverPhoto} style={{ width: "50px", height: "50px" }} /></td>
                                <td>{ser.price}</td>
                                <td><i className="bi bi-pencil-square" onClick={() => Views(index)}></i> </td>
                                <td><button className='btn btn-primary' onClick={() => Read(index)}>View</button></td>
                            </tr>

                        ))

                    }

                </tbody>
            </table>

            {
                cancel &&

                <div className='popup border rounded position-absolute'>
                    <h3 className='text-center'>Create Services</h3>
                    <div className='d-flex justify-content-end  fs-3 fw-bold close' onClick={() => setCancel(false)}>&times;</div>
                    <div>
                        <form className=''>
                            <div className="mb-3">
                                <label><h6>Name:</h6></label>
                                <input type='text' className='form-control' value={create.name} onChange={(e) => Store(e, "name")} />
                            </div>

                            <div className="mb-3">
                                <label><h6>Description:</h6></label>
                                <input type='text' className='form-control' value={create.description} onChange={(e) => Store(e, "description")} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label"><h6>CoverPhoto :</h6></label>
                                <input type='file' className='form-control' onChange={(e) => Store(e, "coverPhoto")} />
                            </div>


                            <div className="mb-3">
                                <label><h6>Price:</h6></label>
                                <input type='text' className='form-control' value={create.price} onChange={(e) => Store(e, "price")} />
                            </div>


                            <div className="mb-3">
                                <button className="btn btn-primary float-start create" onClick={() => setCancel(false)}>Cancel</button>
                                <button className="btn btn-primary float-end create" onClick={(e) => Save(e)}>Save</button>
                            </div>

                        </form>
                    </div>
                </div>
            }

            {
                list &&

                <div className='popup border rounded position-absolute'>
                    <h3 className='text-center'>Services</h3>
                    <div className='d-flex justify-content-end  fs-3 fw-bold close' onClick={() => setlist(false)}>&times;</div>
                    <div>
                        <form className=''>
                            <div className="mb-3">
                                <label><h6>Name:</h6></label>
                                <input type='text' className='form-control' value={view.name || ''}
                                    onChange={(e) => setView({ ...view, name: e.target.value })} />
                            </div>

                            <div className="mb-3">
                                <label><h6>Description:</h6></label>
                                <input type='text' className='form-control' value={view.description || ''}
                                    onChange={(e) => setView({ ...view, description: e.target.value })} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor='coverPhoto' className="form-label"><h6>CoverPhoto :</h6><img src={view.coverPhoto} alt='Cover Photo' style={{ width: '100px', height: '100px' }} /></label>
                                <input id='coverPhoto' hidden type='file' className='form-control' onChange={(e) => setView({ ...view, coverPhoto: e.target.files[0] })} />
                            </div>

                            <div className="mb-3">
                                <label><h6>Price:</h6></label>
                                <input type='text' className='form-control' value={view.price || ''}
                                    onChange={(e) => setView({ ...view, price: e.target.value })} />
                            </div>


                            <div className="mb-3">
                                <button className="btn btn-primary float-start create" onClick={() => setlist(false)}>Cancel</button>
                                <button className="btn btn-primary float-end create" onClick={(e) => Edit(e)} >Save</button>
                            </div>

                        </form>
                    </div>
                </div>
            }

            {/* Read only */}
            {
                dataview &&

                <div className='popup border rounded position-absolute'>
                    <h3 className='text-center '>Services</h3>
                    <div className='d-flex justify-content-end  fs-3 fw-bold close' onClick={() => setdataView(false)}>&times;</div>
                    <div>

                        <div className="mb-3">
                            <label className='fw-bold '> Name : </label>
                            <p className='ps-3 d-inline-block'>{view.name}</p>
                        </div>

                        <div className="mb-3">
                            <label className='fw-bold pe-2'> Description : </label>
                            {view.description}
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">CoverPhoto :</label><img src={view.coverPhoto} alt='Cover Photo' style={{ width: '100px', height: '100px', marginLeft: '30px' }} />

                        </div>

                        <div className="mb-3">
                            <label className='fw-bold '> Price : </label>
                            <p className='ps-3 d-inline-block'>{view.price}</p>
                        </div>


                        <div className="mb-3">
                            <button className="btn btn-primary text-center create" onClick={() => setdataView(false)}>Cancel</button>

                        </div>

                    </div>
                </div>
            }

        </div >
    )
}
