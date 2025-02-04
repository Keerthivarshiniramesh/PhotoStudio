import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Contextuse } from '../Providerr'
import Denied from './Denied'


export default function Login() {
    const beurl = process.env.REACT_APP_beUrl

    let [valid, setValid] = useState({ email: '', pwd: '' })
    let [check, setCheck] = useState(false)
    let { setAdmin } = useContext(Contextuse)
    let use = useNavigate()

    let Validation = (event, keys) => {

        let values = event.target.value
        setValid(prev => ({
            ...prev,
            [keys]: values

        }))

    }

    let Submits = (e) => {
        e.preventDefault()

        if (valid.email === ' ' && valid.pwd === '') {
            setCheck(true)
        }
        else {
            setCheck(false)
            fetch(`${beurl}login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ email: valid.email, password: valid.pwd })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success === true) {
                        alert(data.message)
                        // use('/home')
                        use('/dashboard')

                    }
                    else {
                        // alert(data.message)
                        setCheck(true)

                    }
                })
                .catch(err => {
                    console.log("Error in Login", err)
                    alert("Trouble in Conecting to Server !!")
                })

        }

    }

    return (
        <div className='login'>
            <header className="container-fluid   text-center">
                <h3 className=" text-white ">ASATHAL DIGITAL STUDIO</h3>
            </header>

            <main className="container text-center">
                <div className="container form1 mx-auto p-4" style={{ maxWidth: '400px' }}>
                    <h3 className="p-3 text-primary">Login</h3>
                    <form>
                        <input type="email" placeholder="Email" className="form-control p-3 mb-3" value={valid.email} onChange={(e) => Validation(e, "email")} />

                        <input type="text" placeholder="Password" className="form-control p-3 mb-3" value={valid.pwd} onChange={(e) => Validation(e, "pwd")} />

                        {check && (
                            <p className="text-danger">*Invalid  email or Password</p>
                        )}

                        <button className="btn btn-primary mt-4 w-100" onClick={(e) => Submits(e)}> Login</button>
                    </form>

                </div>
            </main>
        </div>

    )
}
