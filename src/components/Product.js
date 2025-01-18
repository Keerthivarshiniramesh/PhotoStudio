import React, { useContext, useEffect, useRef, useState } from 'react'
import { Contextuse } from '../Providerr';
import logo from '../assets/ADS_bg_Logo.png'
export default function Product() {

    let { products, setProducts } = useContext(Contextuse)

    let [create, setCreate] = useState({

        name: '',
        coverPhoto: null,
        framePhoto: null,
        availableSizes: [],

    })
    let [cancel, setCancel] = useState(false)
    let [list, setlist] = useState(false)
    let [dataview, setdataView] = useState(false)
    let [view, setView] = useState({

        name: '',
        coverPhoto: null,
        framePhoto: null,
        availableSizes: '',
        stock: ''
    })

    let radioRef = useRef(null)
    let heightRef = useRef(null)
    let widthRef = useRef(null)

    let Views = (i) => {
        if (products[i]) {
            let one = products[i]
            setView(one)
            console.log(view)
            setlist(true)
            setCancel(false)
            setdataView(false)

        }
        else {
            console.error('Product not found at index:', i);
        }

    }
    let Read = (i) => {
        if (products[i]) {
            let one = products[i]
            setView(one)
            console.log(view)
            setdataView(true)
            setlist(false)
            setCancel(false)

        }


    }

    let Add = () => {
        let heights = heightRef.current.value
        let widths = widthRef.current.value

        setCreate((prev) => ({
            ...prev,
            availableSizes: [
                ...prev.availableSizes,
                { height: heights, width: widths },],
        }));

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
        if (products.length === 0) {
            id = 1
        }
        else {
            let lastPro = products.slice(-1)
            id = lastPro[0].id + 1
        }
        const selectedRadio = radioRef.current.querySelector('input[name="stock"]:checked');
        const selectedValue = selectedRadio ? selectedRadio.value : null;


        if (id !== '' || create.name !== '' || create.coverPhoto !== '' || create.framePhoto !== '' || create.availableSizes !== '' || selectedValue !== '') {
            form.append('id', id)
            form.append('name', create.name)
            form.append('coverPhoto', create.coverPhoto)
            form.append('framePhoto', create.framePhoto)
            form.append('availableSizes', create.availableSizes)
            form.append('stock', selectedValue)
        }
        else {

        }
    }
    let SizeChange = (e, i, key) => {
        const { value } = e.target;


        const temp = [...view.availableSizes];
        temp[i] = { ...temp[i], [key]: value };

        setView((prevState) => ({
            ...prevState,
            availableSizes: temp,
        }));
    }

    let Edit = (e) => {
        e.preventDefault()
        setProducts((prev) =>
            prev.map((product) =>
                product.id === view.id ? { ...product, ...view } : product
            ))
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
                        <th scope="col">Name</th>
                        <th scope="col" className="d-none d-md-table-cell">CoverPhoto</th>
                        <th scope="col" className="d-none d-md-table-cell">FramePhoto</th>
                        <th scope="col" className="d-none d-md-table-cell">AvailableSize</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products && products.map((pro, index) =>
                        (
                            <tr key={index}>
                                <th>{pro.id}</th>
                                <td>{pro.name}</td>
                                <td className="d-none d-md-table-cell"><img src={pro.coverPhoto} style={{ width: "50px", height: "50px" }} /></td>
                                <td className="d-none d-md-table-cell"><img src={pro.framePhoto} style={{ width: "50px", height: "50px" }} /></td>
                                <td className="d-none d-md-table-cell">{pro.availableSizes.length}</td>
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
                                <label className="form-label"><h6>AvailableSize:</h6> </label>
                                <input type="text" className="form-control mb-1" ref={heightRef} placeholder='Height' />
                                <input type="text" className="form-control mb-1" ref={widthRef} placeholder='Width' />
                                <button className="btn btn-primary m-2" onClick={() => Add()}>Add</button>
                            </div>

                            <div className="mb-3">
                                <label className="form-label " ><h6>Stock:</h6></label>
                                <input type="radio" name='stock' className='ms-4' value='Available' />Available
                                <input type="radio" name='stock' className='ms-4' value='Out of Stock' />Out of Stock
                            </div>

                            <div className="mb-3 buttons">
                                <button className="btn btn-primary create" onClick={() => setCancel(false)}>Cancel</button>
                                <button className="btn btn-primary" onClick={(e) => Save(e)}>Save</button>
                            </div>

                        </form>
                    </div>
                </div>
            }

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
                                <label htmlFor='coverPhoto' className="form-label"><h6>CoverPhoto :</h6><img src={view.coverPhoto} alt='Cover Photo' style={{ width: '100px', height: '100px' }} /></label>
                                <input id='coverPhoto' hidden type='file' className='form-control' onChange={(e) => setView({ ...view, coverPhoto: e.target.files[0] })} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor='framePhoto'><h6>FramePhoto :</h6><img src={view.framePhoto} alt='FramePhoto' style={{ width: '100px', height: '100px' }} /></label>
                                <input type="file" id='framePhoto' hidden className="form-control" onChange={(e) => setView({ ...view, framePhoto: e.target.files[0] })} />
                            </div>

                            <div className="mb-3">
                                <label className="form-label"><h6>AvailableSize:</h6> </label>
                                {
                                    view.availableSizes.map((size, index) =>
                                    (
                                        <div key={index} className="d-flex mb-2">

                                            <input
                                                type="text" className="form-control" value={size.height} onChange={(e) => SizeChange(e, index, 'height')} />
                                            <span className="mx-2">x</span>

                                            <input
                                                type="text" className="form-control" value={size.width} onChange={(e) => SizeChange(e, index, 'width')} />
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="mb-3">
                                <label className="form-label " ><h6>Stock:</h6></label>
                                <input type="radio" name='stock' className='ms-4' value='Available' checked={view.stock === 'Available'} onChange={() => setView((prevState) => ({ ...prevState, stock: "Available" }))} />Available
                                <input type="radio" name='stock' className='ms-4' value='Out of Stock' checked={view.stock === 'Out of Stock'} onChange={() => setView((prevState) => ({ ...prevState, stock: "Out of Stock" }))} />Out of Stock
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
                            <label className="form-label fw-bold">CoverPhoto :</label><img src={view.coverPhoto} alt='Cover Photo' style={{ width: '100px', height: '100px', marginLeft: "30px" }} />

                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">CoverPhoto :</label><img src={view.framePhoto} alt='FramePhoto' style={{ width: '100px', height: '100px', marginLeft: "30px" }} />

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
                            <p className='ps-3 d-inline-block'>{view.stock}</p>
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
