import React, { useContext, useEffect, useState } from 'react';
import { Contextuse } from '../Providerr';
import logo from '../assets/ADS_bg_Logo.png';
import { useParams } from 'react-router-dom';
import Loading from './Loading';

export default function Frames() {
    let { products, orders } = useContext(Contextuse); // Get products from the context

    // // Set initial state for the current index of products (acting as testimonials)
    // const [currentIndex, setCurrentIndex] = useState(0);

    // // Handle next testimonial
    // const handleNext = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    // };

    // // Handle previous testimonial
    // const handlePrevious = () => {
    //     setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    // };

    // // Get the current product based on the currentIndex
    // const { framePhoto } = products[currentIndex];

    let { name } = useParams()

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

    useEffect(() => {
        if (current && current.availableSizes.length > 0) {
            // Set the initial value as a stringified object
            setSize(JSON.stringify(current.availableSizes[0]));
        }
    }, [current])


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
            form.append("customerSize", store.custonmerSize)

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
            {/* Header Section */}
            <header className="container-fluid text-center bg-white home d-flex justify-content-center align-content-center">
                <img
                    src={logo}
                    style={{ width: '50px', height: '50px' }} // Fixed typo here (width instead of with)
                    className="d-inline-block mt-5 pt-2"
                    alt="logo"
                />
                <h3 className="mt-5 mb-5 text-white">ASATHAL DIGITAL STUDIO</h3>
            </header>

            {/* Testimonials Section */}
            <main className=" m-4">
                <div className="py-5 bg-light">
                    <div className="container text-center">
                        <h3 className="text-2xl font-bold mb-4">Testimonials</h3>

                        <div className="card mx-auto shadow-lg rounded-3 p-4" style={{ maxWidth: '600px' }}>
                            <div className="card-body">
                                <div className="d-flex justify-content-center mb-4">
                                    <img
                                        src="dfd"
                                        alt='Frame'
                                        className=" "
                                        width="100"
                                        height="100"
                                    />
                                </div>
                            </div>
                            {/* Navigation Buttons */}
                            <div className="d-flex justify-content-between mt-4">
                                <button className="btn btn-secondary">
                                    Previous
                                </button>
                                <button className="btn btn-secondary">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <input type='file' onChange={(e) => Create(e, 'photo')}></input>

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
                        <input type="text" placeholder="Quantity Date" className="form-control p-3 mb-3" value={store.quantity} onChange={(e) => Create(e, "quantity")} />

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
        </div >
    );
}
