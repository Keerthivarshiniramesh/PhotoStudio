import React, { useContext, useEffect, useRef, useState } from 'react'
import { Contextuse } from '../Providerr';
import logo from '../assets/ADS_bg_Logo.png'
import Loading from './Loading';
export default function Service() {

    let { services, setServices } = useContext(Contextuse)

    let beurl = process.env.REACT_APP_beUrl

    let [create, setCreate] = useState({

        name: '',
        description: '',
        coverPhoto: null,
        price: '',
        isAvailable: false

    })
    let [cancel, setCancel] = useState(false)
    let [list, setlist] = useState(false)
    let [dataview, setdataView] = useState(false)
    let [view, setView] = useState({

        name: '',
        description: '',
        coverPhoto: null,
        price: '',
        isAvailable: false
    })


    // Delete the Services

    const Delete = (i) => {
        fetch(`${beurl}delete-service/${i}`, {
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

    // Update the Services

    let Update = (i) => {

        fetch(`${beurl}fetch-service/${i}`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setView(data.service)

                }
                else {
                    alert(data.message)
                }
            })
            .catch(err => {
                console.log("Error in fetch the products", err)
                alert("Trouble in connecting to Server !!")
            })
        setlist(true)
        setCancel(false)
        setdataView(false)
    }


    let Edit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', view.name)
        formData.append('description', view.description)
        formData.append('price', view.price)
        formData.append('isAvailable', view.isAvailable)
        formData.append('coverPhoto', view.coverPhoto)


        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        console.log("id in edit:", view.id)

        fetch(`${beurl}update-service/${view.id}`, {
            method: "POST",
            credentials: "include",
            body: formData

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


    // View the services

    let Read = (i) => {
        fetch(`${beurl}fetch-service/${i}`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setView(data.service)

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
        setlist(false)
        setCancel(false)




    }

    // Create the Services
    const form = new FormData();
    let Store = (e, keys) => {

        let values = e.target.value
        let types = e.target.type
        let file = e.target.files
        let check = e.target.checked

        if (types === 'file' && file.length > 0) {
            setCreate(prev => (
                {
                    ...prev,
                    [keys]: file[0]
                }))
        }
        else if (types === "checkbox") {
            setCreate(prev => (
                {
                    ...prev,
                    [keys]: check
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


        if (create.name !== '' || create.description !== '' || create.coverPhoto !== '' || create.price !== '') {
            form.append('name', create.name)
            form.append('description', create.description)
            form.append('price', create.price)
            form.append('isAvailable', create.isAvailable)
            form.append('coverPhoto', create.coverPhoto)



            for (let pair of form.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            fetch(`${beurl}add-service`, {
                method: "POST",
                credentials: "include",
                body: form
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
                    console.log("Error", err)
                    alert("Trouble in connecting to the Server !!")
                }
                )


        }
        else {

        }
    }

    if (services === null) {
        return <Loading />
    }


    return (
        <div className='overflow-hidden'>
            <header className='container-fluid text-center bg-white home d-flex justify-content-center align-content-center mb-5'>
                <img src={logo} style={{ with: '50px', height: '50px' }} className='d-inline-block mt-5 pt-2' />
                <h3 className='mt-5  mb-5 text-white'>ASATHAL DIGITAL STUDIO </h3>
            </header>

            <button className='btn btn-primary m-5 float-end  produce' onClick={() => setCancel(true)} >Create Services</button>

            <table className="table caption-top position-relative">
                <caption>List of Services</caption>
                <thead className='table-light'>

                    <tr>
                        <th scope="col">S.No</th>
                        <th scope="col">Name</th>
                        <th scope="col " className="d-none d-sm-table-cell">CoverPhoto</th>
                        <th scope="col" className="d-none d-md-table-cell">Price</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        services && services.map((ser, index) =>
                        (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{ser.name}</td>
                                <td className="d-none d-sm-table-cell"><img src={`${beurl}${ser.coverPhoto}`} style={{ width: "50px", height: "50px" }} /></td>
                                <td className="d-none d-md-table-cell">{ser.price}</td>
                                <td><i className="bi bi-pencil-square" onClick={() => Update(ser.id)}></i> </td>
                                <td><i className="bi bi-trash-fill" onClick={() => Delete(ser.id)} ></i> </td>
                                <td><button className='btn btn-primary' onClick={() => Read(ser.id)}>View</button></td>
                            </tr>

                        ))

                    }

                </tbody>
            </table>

            {/* Create the Services */}

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

                                <label className="form-label " ><h6>Available</h6></label>
                                <input type="checkbox" className='ms-4' name="isAvailable" checked={create.isAvailable} onChange={(e) => Store(e, "isAvailable")} />Available
                            </div>

                            <div className="mb-3 buttons">
                                <button className="btn btn-primary  create" onClick={() => setCancel(false)}>Cancel</button>
                                <button className="btn btn-primary " onClick={(e) => Save(e)}>Save</button>
                            </div>

                        </form>
                    </div>
                </div>
            }

            {/* Update the Services */}
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
                                <label htmlFor='coverPhoto' className="form-label"><h6>CoverPhoto :</h6><img src={`${beurl}${view.coverPhoto}`} alt='Cover Photo' style={{ width: '100px', height: '100px' }} /></label>
                                <input id='coverPhoto' hidden type='file' className='form-control' onChange={(e) => setView({ ...view, coverPhoto: e.target.files[0] })} />
                            </div>

                            <div className="mb-3">
                                <label><h6>Price:</h6></label>
                                <input type='text' className='form-control' value={view.price || ''}
                                    onChange={(e) => setView({ ...view, price: e.target.value })} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label " ><h6>Stock:</h6></label>
                                <input type="checkbox" className='ms-4' name="isAvailable" checked={view.isAvailable} onChange={(e) => setView({ ...view, isAvailable: e.target.checked })} />Available
                            </div>


                            <div className="mb-3 buttons">
                                <button className="btn btn-primary  create" onClick={() => setlist(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={(e) => Edit(e)} >Save</button>
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
                            <label className="form-label fw-bold">CoverPhoto :</label><img src={`${beurl}${view.coverPhoto}`} alt='Cover Photo' style={{ width: '100px', height: '100px', marginLeft: '30px' }} />

                        </div>

                        <div className="mb-3">
                            <label className='fw-bold '> Price : </label>
                            <p className='ps-3 d-inline-block'>{view.price}</p>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold" >Stock: </label>
                            <p className='ps-3 d-inline-block'>{`${view.isAvailable === true ? "Available" : "Out of Stock"}`}</p>
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
