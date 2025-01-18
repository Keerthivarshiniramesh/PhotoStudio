import React, { useContext, useEffect, useRef, useState } from 'react';
import { Contextuse } from '../Providerr';
import logo from '../assets/ADS_bg_Logo.png';
import { useParams } from 'react-router-dom';
import Loading from './Loading';

export default function Frames() {
    let { products, orders } = useContext(Contextuse);



    let [upload, setUpload] = useState(false)
    let [photoUrl, setPhotoUrl] = useState('')


    let { name } = useParams()
    let photoRef = useRef(null)


    let [size, setSize] = useState(null)
    let [store, setStore] = useState({
        name: '',
        email: '',
        number: '',
        address: '',
        photo: null,
        currentDate: new Date().toISOString().split("T")[0],
        quantity: '',
        custonmerSize: size
    })

    let current = products.find((product) => product.name === name)
    const [currentIndex, setCurrentIndex] = useState(current.id - 1);

    useEffect(() => {
        if (current && current.availableSizes.length > 0) {
            // Set the initial value as a stringified object
            setSize(JSON.stringify(current.availableSizes[0]));
        }
    }, [current])


    const handleImageClick = (index) => {
        setCurrentIndex(index);
    }

    function Create(e, keys) {
        let values = e.target.value
        let types = e.target.type
        let file = e.target.files

        if (types === 'file' && file.length > 0) {
            setStore(prev => (
                {
                    ...prev,
                    [keys]: file[0]
                }))
        }
        else {
            setStore(prev => ({
                ...prev,
                [keys]: values
            }))
        }

    }
    console.log("url:", photoUrl)
    function Add() {
        if (photoRef.current.files[0]) {

            const convertedURL = URL.createObjectURL(photoRef.current.files[0])
            setPhotoUrl(convertedURL)
            setUpload(true)
        }
        else {
            alert("Upload Your photo !!!😊")
        }

    }
    // console.log("Image", user_photo)
    let form = new FormData()
    let Order = (e) => {
        e.preventDefault()
        let id;
        if (orders.length === 0) {
            id = 1
        }
        else {
            let lastPro = orders.slice(-1)
            id = lastPro[0].id + 1
        }

        if (id !== '' || store.name !== '' || store.address !== '' || store.email !== ''
            || store.number !== '' || store.startDate !== '' || store.endDate !== '') {

            form.append("id", id)
            form.append(" customerName", store.name.trim())
            form.append("email", store.email.trim())
            form.append("contact", store.number.trim())
            form.append("address", store.address.trim())
            form.append("photo", store.photo)
            form.append("frameName", current.name.trim())
            form.append("date", store.currentDate.trim())
            form.append("quantity", store.quantity.trim())
            form.append("size", size.trim())


            console.log(form)
            for (let pair of form.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
        }
    }

    const handleFrameSizes = (value) => {

        setSize(value)
    }

    console.log('sizes:', size)
    console.log('current:', current.availableSizes)

    if (current === null || size === null) {
        return <Loading />
    }

    return (
        <div className="user_bg">

            <header className="container-fluid text-center bg-white home d-flex justify-content-center align-content-center">
                <img
                    src={logo} style={{ width: '50px', height: '50px' }} className="d-inline-block mt-5 pt-2" alt="logo"
                />
                <h3 className="mt-5 mb-5 text-white">ASATHAL DIGITAL STUDIO</h3>
            </header>

            <main className=" m-4">
                <div className="details ">
                    <img src={products[currentIndex].framePhoto} className='position-relative frame1' />

                    {
                        upload &&

                        <img src={photoUrl} className={` uploadPhoto border position-absolute`}  ></img>


                    }

                    <p>{products[currentIndex].name}</p>

                </div>

                <div className="slider-container">
                    <div className="slider">
                        {products.map((product, index) => (
                            <img key={index} src={product.framePhoto} alt="gfyuf" className={`thumbnail ${index === currentIndex ? "active" : ""}`}
                                onClick={() => handleImageClick(index)} />
                        ))}
                    </div>
                </div>


                <div className="row justify-content-end mt-5">
                    <div className="col-md-6">
                        <form>
                            <div className="mb-3 d-inline-block">
                                <input type='file' className='sm ' onChange={(e) => Create(e, 'photo')} ref={photoRef}></input>
                            </div>
                            <div class="mb-3 d-inline-block">
                                <button className="btn rounded border mt-3 view" onClick={() => Add()}>Add Photo</button>
                            </div>
                        </form>
                    </div>
                </div>


                <div className="container form1 mx-auto p-4" style={{ maxWidth: '700px' }}>
                    <h3 className="p-3 text-primary">Personal Details</h3>
                    <form>
                        <label className='mb-3'>Name : </label>
                        <input type="email" placeholder="UserName" className="form-control p-3 mb-3" value={store.name} onChange={(e) => Create(e, "name")} />

                        <label className='mb-3'>Email : </label>
                        <input type="email" placeholder="Email" className="form-control p-3 mb-3" value={store.email} onChange={(e) => Create(e, "email")} />

                        <label className='mb-3'>Contact Number : </label>
                        <input type="email" placeholder="Number" className="form-control p-3 mb-3" value={store.number} onChange={(e) => Create(e, "number")} />

                        <label className='mb-3'>Address : </label>
                        <input type="email" placeholder="Address" className="form-control p-3 mb-3" value={store.address} onChange={(e) => Create(e, "address")} />

                        <label className='mb-3'> Date : </label>
                        <input type="date" placeholder=" Date" className="form-control p-3 mb-3" value={store.currentDate} onChange={(e) => Create(e, "currentDate")} />

                        <label className='mb-3'> Quantity: </label>
                        <input type="text" placeholder="Quantity " className="form-control p-3 mb-3" value={store.quantity} onChange={(e) => Create(e, "quantity")} />

                        <div className="mb-3 ">
                            <label className="" >Size: </label>
                            <select value={size} onChange={(e) => handleFrameSizes(e.target.value)} className='ms-3'>
                                {
                                    current && current.availableSizes.map((sizes, index) => {
                                        return (
                                            <option key={index} value={JSON.stringify(sizes)} >{`${sizes.height} * ${sizes.width}`}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <button className="btn btn-primary mt-4 w-50 " style={{ marginLeft: '80px' }} onClick={(e) => Order(e)}> Order Now </button>
                    </form>
                </div>

            </main >


            <footer className="text-white">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center bg-secondary f1 p-4">
                    <div className=" mb-4 mb-md-0 text-center address">
                        <i className="bi bi-geo-alt-fill d-inline-block"><p className='d-inline-block ms-2'>14/2, Sasthiri Salai, Surampatti Valasu, Erode - 638009</p></i>
                        <br></br><i className="bi bi-telephone-fill" />
                        <p className='d-inline-block ms-2'>9842798919</p>
                        <br></br> <i className="bi bi-envelope-fill"></i>
                        <p className='d-inline-block ms-2'>Asathaldigitalstudio@gmail.com</p>
                    </div>
                    <div className="text-center social" >
                        <p>Follow Us</p>
                        <i className="bi bi-facebook m-2"></i>
                        <i className="bi bi-instagram m-2"></i>
                        <i className="bi bi-whatsapp m-2"></i>
                        <i className="bi bi-google m-2"></i>
                    </div>
                </div>
            </footer>
        </div >
    )
}
