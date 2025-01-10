import React, { useCallback, useContext, useState } from 'react'
import logo from '../assets/ADS_bg_Logo.png'
import { Contextuse } from '../Providerr'
import { useParams } from 'react-router-dom'
export default function Event() {
    let { services, bookings, } = useContext(Contextuse)

    let { name } = useParams()

    let [store, setStore] = useState({
        name: '',
        email: '',
        number: '',
        address: '',
        startDate: '',
        endDate: '',


    })

    let current = services.find((service) => service.name === name)


    function Create(e, keys) {
        let values = e.target.value
        setStore(prev => ({
            ...prev,
            [keys]: values
        }))
    }

    let form = new FormData()
    let Booking = (e) => {
        e.preventDefault()
        let id;
        if (bookings.length === 0) {
            id = 1
        }
        else {
            let lastPro = bookings.slice(-1)
            id = lastPro[0].id + 1
        }

        if (id !== '' || store.name !== '' || store.address !== '' || store.email !== ''
            || store.number !== '' || store.startDate !== '' || store.endDate !== '') {

            form.append("id", id)
            form.append(" customerName", store.name.trim())
            form.append("email", store.email.trim())
            form.append("contact", store.number.trim())
            form.append("address", store.address.trim())
            form.append("serviceName", current.name.trim())
            form.append("startDate", store.startDate.trim())
            form.append("endDate", store.endDate.trim())
            console.log(form)
            for (let pair of form.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
        }
    }
    return (
        <div className='user_bg'>
            <header className='container-fluid text-center bg-white home d-flex justify-content-center align-content-center'>
                <img src={logo} style={{ with: '50px', height: '50px' }} className='d-inline-block mt-5 pt-2' />
                <h3 className='mt-5  mb-5 text-white'>ASATHAL DIGITAL STUDIO </h3>
            </header>


            <main className="  align-items-center m-4">
                <div className="d-flex flex-column justify-content-center align-items-center thin">
                    <p className={`text-center text-black`}>
                        {current.name} </p>
                </div>
                <div className="m-5">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-6 text-center">
                            <img src={current.coverPhoto} className="img-fluid" alt="Services" />
                        </div>
                        <div className="col-12 col-md-6 text-center mt-4">
                            <p className="content">
                                {current.description}
                            </p>
                        </div>
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

                        <label className='mb-3'>Start Date : </label>
                        <input type="date" placeholder="Start Date" className="form-control p-3 mb-3" value={store.startDate} onChange={(e) => Create(e, "startDate")} />

                        <label className='mb-3'>End Date : </label>
                        <input type="date" placeholder="End Date" className="form-control p-3 mb-3" value={store.endDate} onChange={(e) => Create(e, "endDate")} />



                        <button className="btn btn-primary mt-4 w-50 " style={{ marginLeft: '80px' }} onClick={(e) => Booking(e)}> Book Now </button>
                    </form>
                </div>
            </main>
        </div>
    )
}
