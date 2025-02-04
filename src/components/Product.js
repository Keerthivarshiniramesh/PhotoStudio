import React, { useContext, useRef, useState } from 'react'
import { Contextuse } from '../Providerr';
import logo from '../assets/ADS_bg_Logo.png'
import Loading from './Loading';
import { useParams } from 'react-router-dom';



export default function Product() {

    let { products } = useContext(Contextuse)

    let beurl = process.env.REACT_APP_beUrl

    let { id } = useParams()

    let [create, setCreate] = useState({

        name: '',
        coverPhoto: null,
        framePhoto: null,
        price: "",
        availableSizes: [],
        isAvailable: false

    })

    const handleSizeRemoval = (i) => {
        console.log("func called")
        setCreate(prev => {
            let tempCreate = { ...prev }
            let tempSize = tempCreate.availableSizes.filter((item, index) => index !== i)
            tempCreate.availableSizes = tempSize
            return tempCreate
        })
        // console.log("Create after updation:", create)
    }

    // console.log("Create available sizes:", create.availableSizes)

    let [cancel, setCancel] = useState(false)
    let [list, setlist] = useState(false)
    let [dataview, setdataView] = useState(false)
    let [view, setView] = useState({

        name: '',
        coverPhoto: null,
        framePhoto: null,
        price: "",
        availableSizes: [],
        isAvailable: false

    })

    let heightRef = useRef(null)
    let widthRef = useRef(null)

    // create products

    let Add = (e) => {
        e.preventDefault()
        let heights = Number(heightRef.current.value)
        let widths = Number(widthRef.current.value)

        // console.log("h w:", typeof heights, widths)

        setCreate((prev) => ({
            ...prev,
            availableSizes: [
                ...prev.availableSizes,
                { height: heights, width: widths },],
        }));

    }

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
        // console.log(create)
    }

    // console.log(products)



    let Save = (e) => {
        e.preventDefault()
        const forms = new FormData();

        if (create.name !== '' || create.coverPhoto !== null || create.framePhoto !== null || !create.availableSizes) {
            forms.append('name', create.name)
            forms.append('availableSizes', JSON.stringify(create.availableSizes))
            forms.append('price', create.price)
            forms.append('isAvailable', create.isAvailable)
            forms.append('framePhoto', create.framePhoto)
            forms.append('coverPhoto', create.coverPhoto)

            // console.log("Forms :", forms)
            // for (let pair of forms.entries()) {
            //     console.log(pair[0] + ': ' + pair[1]);
            // }
            fetch(`${beurl}add-product`, {
                method: "POST",
                // headers:
                // {
                //     "Content-Type": "application/json",
                //     "Accept" : "application/json"
                // },
                credentials: "include",
                body: forms
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
            alert("Fill the form")
        }
    }



    // Edit the products

    let formData = new FormData()
    let SizeChange = (e, i, key) => {
        let { value } = e.target;
        let values = Number(value)

        const temp = [...view.availableSizes];
        temp[i] = { ...temp[i], [key]: values };
        // console.log(typeof values)
        setView((prevState) => ({
            ...prevState,
            availableSizes: temp,
        }));
    }
    // name, availableSizes[{height:, width:}], price(number), isAvailable(boolean), framePhoto, coverPhoto

    let Edit = (e) => {
        console.log("Views", view)
        e.preventDefault()
        formData.append('name', view.name)
        formData.append('availableSizes', JSON.stringify(view.availableSizes))
        // console.log("Available Sizes in update", JSON.stringify(view.availableSizes))
        formData.append('price', view.price)
        formData.append('isAvailable', view.isAvailable)
        formData.append('framePhoto', view.framePhoto)
        formData.append('coverPhoto', view.coverPhoto)

        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ': ' + pair[1]);
        // }

        // console.log("id in edit:", view.id)

        fetch(`${beurl}update-product/${view.id}`, {
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
    let Update = (i) => {


        fetch(`${beurl}fetch-product/${i}`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setView(data.product)
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

    // Read the products

    let Read = (i) => {
        fetch(`${beurl}fetch-product/${i}`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setView(data.product)
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

    // Delete the products
    let Delete = (i) => {
        fetch(`${beurl}delete-product/${i}`, {
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

    let [photoedit, setPhotoedit] = useState(false)
    let [photoUrl, setPhotoUrl] = useState('')
    let [coverphotoedit, setPhotoCoveredit] = useState(false)
    let [coverphotoUrl, setPhotoCoverUrl] = useState('')

    let PhotoChange = (e, keys) => {
        let file = e.target.files[0]
        if (keys === 'framePhoto') {
            setView({ ...view, [keys]: file })
            const convertedURL = URL.createObjectURL(file)
            setPhotoUrl(convertedURL)
            setPhotoedit(true)
        }
        else if (keys === 'coverPhoto') {
            setView({ ...view, [keys]: file })
            const convertedURL = URL.createObjectURL(file)
            setPhotoCoverUrl(convertedURL)
            setPhotoCoveredit(true)
        }

    }



    if (products === null) {
        return <Loading />
    }

    return (
        <div>
            <header className='container-fluid text-center bg-white home d-flex justify-content-center align-content-center mb-5'>
                <img src={logo} style={{ with: '50px', height: '50px' }} className='d-inline-block mt-5 pt-2' />
                <h3 className='mt-5  mb-5 text-white'>ASATHAL DIGITAL STUDIO </h3>
            </header>

            <button className='btn btn-primary m-5 float-end  produce' onClick={() => setCancel(true)} >Create Products</button>

            <table className="table caption-top position-relative">
                <caption>List of Products</caption>
                <thead className='table-light'>

                    <tr>
                        <th scope="col">S.No</th>
                        <th scope="col" className="d-none d-md-table-cell"> Pro.Id</th>
                        <th scope="col">Name</th>
                        <th scope="col" className="d-none d-md-table-cell">CoverPhoto</th>
                        <th scope="col" className="d-none d-md-table-cell">FramePhoto</th>
                        <th scope="col" className="d-none d-md-table-cell">AvailableSize</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {


                        products && products.map((pro, index) =>
                        (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td className="d-none d-md-table-cell">{pro.id}</td>
                                <td>{pro.name}</td>
                                <td className="d-none d-md-table-cell"><img src={`${beurl}${pro.coverPhoto}`} style={{ width: "50px", height: "50px" }} /></td>
                                <td className="d-none d-md-table-cell"><img src={`${beurl}${pro.framePhoto}`} style={{ width: "50px", height: "50px" }} /></td>
                                <td className="d-none d-md-table-cell">{pro.availableSizes.length}</td>
                                <td><i className="bi bi-trash-fill" onClick={() => Delete(pro.id)} ></i> </td>
                                <td><i className="bi bi-pencil-square" onClick={() => Update(pro.id)}></i> </td>
                                <td><button className='btn btn-primary' onClick={() => Read(pro.id)}>View</button></td>
                            </tr>

                        ))

                    }

                </tbody>
            </table>

            {/* Create Products */}

            {
                cancel &&

                <div className='popup border rounded position-absolute'>
                    <h3 className='text-center'>Create Products</h3>
                    <div className='d-flex justify-content-end  fs-3 fw-bold close' onClick={() => setCancel(false)}>&times;</div>
                    <div>
                        <form className=''>
                            <div className="mb-3">
                                <label><h6>Name:</h6></label>
                                <input type='text' className='form-control' value={create.name} onChange={(e) => Store(e, "name")} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label"><h6>CoverPhoto :</h6></label>
                                <input type='file' className='form-control' onChange={(e) => Store(e, "coverPhoto")} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label"><h6>FramePhoto :</h6></label>
                                <input type="file" className="form-control" onChange={(e) => Store(e, "framePhoto")} />
                            </div>

                            <div className="mb-3">
                                <label><h6>Price:</h6></label>
                                <input type='number' className='form-control' value={create.price} onChange={(e) => Store(e, "price")} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label"><h6>AvailableSize:</h6> </label>
                                <input type="number" className="form-control mb-1" ref={heightRef} placeholder='Height' />
                                <input type="number" className="form-control mb-1" ref={widthRef} placeholder='Width' />
                                <button className="btn btn-primary m-2" onClick={(e) => Add(e)}>Add</button>
                            </div>

                            <div>
                                {(create.availableSizes && create.availableSizes.length > 0) &&
                                    create.availableSizes.map((item, index) => {
                                        return (
                                            <div className='w-100 d-flex justify-content-between align-items-center border rounded m-1 px-1' key={index}>
                                                <p className='m-0'>{item.height + 'x' + item.width}</p>
                                                <i className='bi bi-x fs-4' onClick={() => handleSizeRemoval(index)} role='button'></i>
                                            </div>
                                        )
                                    })
                                }
                            </div>

                            <div className="mb-3">

                                <label className="form-label " ><h6>Stock</h6></label>
                                <input type="checkbox" className='ms-4' name="isAvailable" checked={create.isAvailable} onChange={(e) => Store(e, "isAvailable")} />Available
                            </div>

                            <div className="mb-3 buttons">
                                <button className="btn btn-primary create" onClick={() => setCancel(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={(e) => Save(e)}>Save</button>
                            </div>

                        </form>

                    </div>
                </div>
            }

            {/* Edit products */}
            {
                list &&

                <div className='popup border rounded position-absolute'>
                    <h3 className='text-center'>Products</h3>
                    <div className='d-flex justify-content-end  fs-3 fw-bold close' onClick={() => setlist(false)}>&times;</div>
                    <div>
                        <form className=''>
                            <div className="mb-3">
                                <label><h6>Name:</h6></label>
                                <input type='text' className='form-control' value={view.name || ''}
                                    onChange={(e) => setView({ ...view, name: e.target.value })} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor='coverPhoto' className="form-label"><h6>CoverPhoto :</h6><img src={coverphotoedit === true ? coverphotoUrl : `${beurl}${view.coverPhoto}`} alt='Cover Photo' style={{ width: '100px', height: '100px' }} /></label>
                                <input id='coverPhoto' hidden type='file' className='form-control' accept="image/*" onChange={(e) => PhotoChange(e, 'coverPhoto')} />
                            </div>



                            <div className="mb-3">
                                <label className="form-label" htmlFor='framePhoto'><h6>FramePhoto :</h6><img src={photoedit === true ? photoUrl : `${beurl}${view.framePhoto}`} alt='FramePhoto' style={{ width: '100px', height: '100px' }} /></label>
                                <input type="file" id='framePhoto' hidden className="form-control" accept="image/*" onChange={(e) => PhotoChange(e, 'framePhoto')} />
                            </div>

                            <div className="mb-3">
                                <label><h6>Price:</h6></label>
                                <input type='text' className='form-control' value={view.price || ''}
                                    onChange={(e) => setView({ ...view, price: e.target.value })} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label"><h6>AvailableSize:</h6> </label>
                                {
                                    view.availableSizes.map((size, index) =>
                                    (
                                        <div key={index} className="d-flex mb-2">

                                            <input
                                                type="number" className="form-control" value={size.height} onChange={(e) => SizeChange(e, index, 'height')} />
                                            <span className="mx-2">x</span>

                                            <input
                                                type="number" className="form-control" value={size.width} onChange={(e) => SizeChange(e, index, 'width')} />
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="mb-3">
                                <label className="form-label " ><h6>Stock:</h6></label>
                                <input type="checkbox" className='ms-4' name="isAvailable" checked={view.isAvailable} onChange={(e) => setView({ ...view, isAvailable: e.target.checked })} />Available
                            </div>


                            <div className="mb-3 buttons">
                                <button className="btn btn-primary  create" onClick={() => setlist(false)}>Cancel</button>
                                <button className="btn btn-primary " onClick={(e) => Edit(e)} >Save</button>
                            </div>

                        </form>
                    </div>
                </div>
            }

            {/* Read only */}
            {
                dataview &&

                <div className='popup border rounded position-absolute'>
                    <h3 className='text-center '>Products</h3>
                    <div className='d-flex justify-content-end  fs-3 fw-bold close' onClick={() => setdataView(false)}>&times;</div>
                    <div>

                        <div className="mb-3">
                            <label className='fw-bold '> Name : </label>
                            <p className='ps-3 d-inline-block'>{view.name}</p>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">CoverPhoto :</label><img src={`${beurl}${view.coverPhoto}`} alt='Cover Photo' style={{ width: '100px', height: '100px', marginLeft: "30px" }} />

                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">FramePhoto :</label><img src={`${beurl}${view.framePhoto}`} alt='FramePhoto' style={{ width: '100px', height: '100px', marginLeft: "30px" }} />

                        </div>

                        <div className="mb-3">
                            <label className='fw-bold '> Price : </label>
                            <p className='ps-3 d-inline-block'>{view.price}</p>
                        </div>

                        <div className="mb-3 ">
                            <label className="form-label fw-bold ">AvailableSize : </label>
                            <div className=' d-flex flex-wrap flex-row '>
                                {
                                    view.availableSizes.map((size, index) =>
                                    (
                                        <div key={index} className="m-2">

                                            <p className='d-inline-block border  border-dark p-1'>{`${size.height} * ${size.width}`}</p>
                                        </div>
                                    ))
                                }
                            </div>
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