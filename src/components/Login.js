import React, { useContext, useState } from 'react'
import { Contextuse } from '../Providerr'
import { useNavigate } from 'react-router-dom'
import bg_img from '../assets/background.jpg'

export default function Login() {
    let [valid, setValid] = useState({ email: '', pwd: '' })
    let [check, setCheck] = useState(false)

    let { admins } = useContext(Contextuse)
    console.log(admins)

    let use = useNavigate()

    let emailReg = /^[a-zA-Z]\w+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/
    let passReg = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[_]).{3,}$/

    let Validation = (event, keys, regexp) => {
        let filed = event.target
        console.log(filed)
        let values = event.target.value
        setValid(prev => ({
            ...prev,
            [keys]: values

        }))
        if (regexp.test(values)) {
            // filed.classList.add("valid")
            // filed.classList.remove("invalid")
            setCheck(false)
        }
        else {
            // filed.classList.add("invalid")
            // filed.classList.remove("valid")
            setCheck(true)

        }
    }

    let Submits = (e) => {
        e.preventDefault()

        if (valid.email === ' ' && valid.pwd === '') {
            setCheck(true)
        }
        else {


            let set = admins.find((admin) => admin.email === valid.email && admin.pwd === valid.pwd)
            console.log(set)
            if (set) {
                setCheck(false)

                use('/home')
            }
            else {
                setCheck(true)
            }

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
                        <input type="email" placeholder="Email" className="form-control p-3 mb-3" value={valid.email} onChange={(e) => Validation(e, "email", emailReg)}
                        />

                        <input type="text" placeholder="Password" className="form-control p-3 mb-3" value={valid.pwd} onChange={(e) => Validation(e, "pwd", passReg)}
                        />

                        {check && (
                            <p className="text-danger">*Enter the valid email or Password</p>
                        )}

                        <button className="btn btn-primary mt-4 w-100" onClick={(e) => Submits(e)}> Login</button>
                    </form>
                </div>
            </main>
        </div>

    )
}
