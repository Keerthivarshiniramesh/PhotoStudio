import React, { useCallback, useContext, useEffect, useState } from 'react'
import logo from '../assets/ADS_bg_Logo.png'
import { useParams } from 'react-router-dom'
import Loading from './Loading'
export default function Event() {
  

    let { id } = useParams()
    const beurl = process.env.REACT_APP_beUrl

    let [store, setStore] = useState({
        name: '',
        email: '',
        number: '',
        address: '',
        startDate: '',
        endDate: '',


    })
    let [check, setCheck] = useState(false)
    let [current, setCurrent] = useState(null)

    useEffect(() => {
        fetch(`${beurl}fetch-service/${id}`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setCurrent(data.service)

                }
                else {
                    alert(data.message)
                }
            })
            .catch(err => {
                console.log("Error in fetch the products", err)
                alert("Trouble in connecting to Server !!")
            })
    }
        , [])


    function Create(e, keys) {
        let phoneReg = /^[6-9][0-9]{9}$/
        let values = e.target.value
        setCheck(false)
        if (keys === 'number') {
            if (phoneReg.test(values)) {
                setCheck(false)
                console.log("true")
            }
            else {
                setCheck(true)
            }
        }

        setStore(prev => ({
            ...prev,
            [keys]: values
        }))
    }

    let form = new FormData()
    let Booking = (e) => {
        e.preventDefault()

        console.log("Store in place booking:", current.id)

        if (store.name !== '' || store.address !== '' || store.email !== ''
            || store.number !== '' || store.startDate !== '' || store.endDate !== '') {

       
            form.append("customerName", store.name)
            form.append("contact", store.number)
            form.append("email", store.email)
            form.append("address", store.address)
            form.append("startDate", store.startDate)
            form.append("endDate", store.endDate)
            form.append("serviceId", current.id)

            console.log(form)
            for (let pair of form.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            const formDataObject = Object.fromEntries(form.entries())

            fetch(`${beurl}place-booking`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formDataObject)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success === true) {
                        alert(data.message)
                        window.location.reload()
                    }
                    else {
                        console.log("All details")
                        alert(data.message)
                    }
                })
                .catch(err => {
                    console.log("Error", err)
                    alert("Trouble in connecting to the Server !!")
                })

        }

    }
    if (current === null) {
        return <Loading />
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
                            <img src={`${beurl}${current.coverPhoto}`} className="img-fluid" alt="Services" />
                        </div>
                        <div className="col-12 col-md-6 text-center mt-4">
                            <p className="content ">
                                {current.description}
                            </p>
                            <p className="content ">{current.id === 1 ? `Each frame tells the story of a love that began with a single glance and will last a lifetime.` : `A video doesn’t just document a smile—it freezes the sparkle in the eyes that comes with it.`}
                            </p>
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

                        <label className='mb-3'>Start Date : </label>
                        <input type="date" placeholder="Start Date" className="form-control p-3 mb-3" value={store.startDate} onChange={(e) => Create(e, "startDate")} />

                        <label className='mb-3'>End Date : </label>
                        <input type="date" placeholder="End Date" className="form-control p-3 mb-3" value={store.endDate} onChange={(e) => Create(e, "endDate")} />

                        {check && (
                            <p className="text-danger">*Please fill the details or enter the valid number</p>
                        )}


                        <button className="btn btn-primary mt-4 w-50 " style={{ marginLeft: '80px' }} onClick={(e) => Booking(e)}> Book Now </button>
                    </form>
                </div>
            </main>


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
        </div>
    )
}
