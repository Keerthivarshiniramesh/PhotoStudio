import React, { useContext, useEffect, useRef, useState } from 'react';
import { Contextuse } from '../Providerr';
import logo from '../assets/ADS_bg_Logo.png';
import { useParams } from 'react-router-dom';
import Loading from './Loading';

export default function Frames() {
    const beurl = process.env.REACT_APP_beUrl
    const { products } = useContext(Contextuse)


    let { id } = useParams()
    let [current, setCurrent] = useState(null)
    // console.log("id is", id)
    useEffect(() => {

        fetch(`${beurl}fetch-product/${id}`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setCurrent(data.product)

                }
                else {
                    alert(data.message)
                }
            })
            .catch(err => {
                console.log("Error in fetch the products", err)
                alert("Trouble in connecting to Server !!")
            })


    }, [id])


    // useEffect(() => {
    //     fetch(`${beurl}fetch-products`, {
    //         method: "GET",
    //         credentials: "include"
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.success === true) {
    //                 alert(data.message)
    //                 console.log("fetch frame", data.products)
    //                 setProducts(data.products)
    //             }
    //             else {
    //                 alert(data.message)
    //             }
    //         })
    //         .catch(err => {
    //             console.log("Error in fetch the products", err)
    //             alert("Trouble in connecting to Server !!")
    //         })

    // }, [])

    // console.log("Product", products)



    let [upload, setUpload] = useState(false)
    let [photoUrl, setPhotoUrl] = useState('')
    let [check, setCheck] = useState(false)


    let photoRef = useRef(null)


    let [size, setSize] = useState(null)
    let [store, setStore] = useState({
        name: '',
        email: '',
        number: '',
        address: '',
        photo: null,
        quantity: '',

    })
    // console.log(products)


    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (current && current.availableSizes.length > 0) {

            // console.log("current.availableSizes:", current.availableSizes)

            const selectedSize = {
                height: current.availableSizes[0].height,
                width: current.availableSizes[0].width
            }
            // Set the initial value as a stringified object
            setSize(selectedSize);
        }
    }, [current])


    const handleImageClick = (index) => {
        setCurrentIndex(index);
    }

    function Create(e, keys) {
        let phoneReg = /^[6-9][0-9]{9}$/
        let values = e.target.value
        let types = e.target.type
        let file = e.target.files
        setCheck(false)

        if (keys === 'number') {
            if (phoneReg.test(values)) {
                setCheck(false)
                // console.log("true")
            }
            else {
                setCheck(true)
            }
        }

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

    let form = new FormData()
    let Order = (e) => {
        e.preventDefault()

        if (store.name === '' || store.address === '' || store.email === ''
            || store.number === '' || store.currentDate === '' || store.quantity === '' || size === '') {
            setCheck(true)

        }
        else {
            if (store.name !== '' || store.address !== '' || store.email !== ''
                || store.number !== '' || store.currentDate !== '' || store.quantity !== '' || size !== '') {


                form.append("customerName", store.name)
                form.append("email", store.email)
                form.append("contact", store.number)
                form.append("address", store.address)
                form.append("productId", products[currentIndex].id)
                form.append("height", size.height)
                form.append("width", size.width)
                // console.log("Type of size", typeof size)
                form.append("quantity", store.quantity)
                // console.log(typeof store.quantity)
                form.append("totalAmount", current.price)
                form.append("image", store.photo)

                console.log(form)
                // for (let pair of form.entries()) {
                //     console.log("Forms :", pair[0] + ': ' + pair[1]);
                // }

                fetch(`${beurl}place-order`, {
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
                    })
            }
        }

    }

    const handleFrameSizes = (value) => {
        console.log("value", typeof value)

        // Split the string into an array based on the comma
        const [height, width] = value.split(',');

        const selectedSize = {
            height: height,
            width: width
        }
        // console.log('selectedSize:', selectedSize)

        setSize(selectedSize)
    }



    if (current === null || size === null || currentIndex === null || !products) {
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
                    <img src={`${beurl}${products[currentIndex].framePhoto}`} className='position-relative frame1' />

                    {
                        upload &&
                        <img src={photoUrl} className={` uploadPhoto border position-absolute`}  ></img>

                    }

                    <p>{ }</p>

                </div>

                <div className="slider-container">
                    <div className="slider">
                        {products.map((product, index) => (
                            <img key={index} src={`${beurl}${product.framePhoto}`} alt="FramePhoto" className={` ${index === currentIndex ? "active" : ""}`}
                                onClick={() => handleImageClick(index)} />
                        ))}
                    </div>
                </div>


                <div className="row justify-content-end mt-5">
                    <div className="col-md-6">
                        <div className="mb-3 d-inline-block">
                            <input type='file' className='sm ' onChange={(e) => Create(e, 'photo')} ref={photoRef}></input>
                        </div>
                        <div className="mb-3 d-inline-block">
                            <button className="btn rounded border mt-3 view" onClick={() => Add()}>Add Photo</button>
                        </div>
                    </div>
                </div>


                <div className="container form1 mx-auto p-4" style={{ maxWidth: '700px' }}>
                    <h3 className="p-3 text-primary">Personal Details</h3>
                    <form>
                        <label className='mb-3'>Name : </label>
                        <input type="text" placeholder="UserName" className="form-control p-3 mb-3" value={store.name} onChange={(e) => Create(e, "name")} />

                        <label className='mb-3'>Email : </label>
                        <input type="email" placeholder="Email" className="form-control p-3 mb-3" value={store.email} onChange={(e) => Create(e, "email")} />

                        <label className='mb-3'>Contact Number : </label>
                        <input type="text" placeholder="Number" className="form-control p-3 mb-3" value={store.number} onChange={(e) => Create(e, "number")} />

                        <label className='mb-3'>Address : </label>
                        <input type="text" placeholder="Address" className="form-control p-3 mb-3" value={store.address} onChange={(e) => Create(e, "address")} />

                        <label className='mb-3'> Quantity: </label>
                        <input type="text" placeholder="Quantity " className="form-control p-3 mb-3" value={store.quantity} onChange={(e) => Create(e, "quantity")} />

                        <label className='mb-3'> Amount: </label>
                        <input type="text" placeholder="Quantity " className="form-control p-3 mb-3" value={current.price} disabled />

                        <div className="mb-3 ">
                            <label className="" >Size: </label>
                            <select defaultValue={size} onChange={(e) => handleFrameSizes(e.target.value)} className='ms-3'>
                                {
                                    current && current.availableSizes.map((sizes, index) => {
                                        return (
                                            <option key={index} value={`${sizes.height + ',' + sizes.width}`} >{`${sizes.height} * ${sizes.width}`}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        {check && (
                            <p className="text-danger">*Please fill the details or enter the valid number</p>
                        )}



                        <button className="btn btn-primary mt-4 w-50 " style={{ marginLeft: '80px' }} onClick={(e) => Order(e)}> Order Now </button>
                    </form>
                </div>

            </main >


            <footer className="text-white">
                <div className="d-flex flex-column flex-md-row justify-content-around align-items-center bg-secondary f1 p-4">
                    <div className=" mb-4 mb-md-0 ">
                        <i className="bi bi-geo-alt-fill d-inline-block"><p className='d-inline-block ms-2'>14/2, Sasthiri Salai, Surampatti Valasu, Erode - 638009</p></i>
                        <br></br><i className="bi bi-telephone-fill" />
                        <p className='d-inline-block ms-2'>9842798919</p>
                        <br></br> <i className="bi bi-envelope-fill"></i>
                        <p className='d-inline-block ms-2'>Asathaldigitalstudio@gmail.com</p>
                    </div>
                    <div className="" >
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
