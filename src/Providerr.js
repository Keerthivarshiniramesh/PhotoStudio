import { createContext, useEffect, useState } from "react"
import React from 'react'

export const Contextuse = createContext()

export default function Providerr(props) {

    let [isadmin, setAdmin] = useState(null)
    let [isAuth, setAuth] = useState(true)

    const beurl = process.env.REACT_APP_beUrl

    let [bookings, setBookings] = useState(null)
    const [products, setProducts] = useState(null)
    let [services, setServices] = useState(null)
    let [orders, setOrder] = useState(null)

    useEffect(() => {
        fetch(`${beurl}fetch-products`, {
            method: "GET",
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setProducts(data.products)
                }
                else {
                    alert(data.message)
                }
            })
            .catch(err => {
                console.log("Eroor in fetching products:", err)
                alert("Trouble in connecting to the Server!")
            })

        fetch(`${beurl}fetch-authuser`, {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {

                if (data.success === true) {
                    if (data.user.role === 'admin') {
                        setAdmin(true)
                        console.log("Current User:", data)
                    }
                    // setAdmin(false)

                }
                else {
                    setAdmin(false)
                    // alert(data.message)
                }
            })
            .catch(err => {
                console.log("Error in Logout ", err)
                alert("Trouble in connecting to the Server !!!")
            }
            )

    }, [])

    useEffect(() => {
        fetch(`${beurl}fetch-services`, {
            method: "GET",
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setServices(data.services)
                }
                else {
                    alert(data.message)
                }
            })
            .catch(err => {
                console.log("Eroor in fetching products:", err)
                alert("Trouble in connecting to the Server!")
            })
    }, [])

    useEffect(() => {
        fetch(`${beurl}fetch-bookings`, {
            method: "GET",
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setBookings(data.bookings)
                }
                else {
                    alert(data.message)
                }
            })
            .catch(err => {
                console.log("Eroor in fetching products:", err)
                alert("Trouble in connecting to the Server!")
            })
    }, [])


    useEffect(() => {
        fetch(`${beurl}fetch-orders`, {
            method: "GET",
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setOrder(data.orders)
                }
                else {
                    alert(data.message)
                }
            })
            .catch(err => {
                console.log("Eroor in fetching products:", err)
                alert("Trouble in connecting to the Server!")
            })
    }, [])

    // let [products, setProducts] = useState([
    //     {
    //         id: 1,
    //         name: "Baroque  Frame",
    //         coverPhoto: Cover1,
    //         framePhoto: Barque,
    //         availableSizes: [
    //             { height: 4, width: 6 },
    //             { height: 5, width: 7 },
    //             { height: 8, width: 10 }
    //         ],
    //         stock: 'Available'

    //     },
    //     {
    //         id: 2,
    //         name: "Modern Metallic Frame",
    //         coverPhoto: Cover2,
    //         framePhoto: Metallic,
    //         availableSizes: [
    //             { height: 5, width: 7 },
    //             { height: 8, width: 10 },
    //             { height: 11, width: 14 }
    //         ],
    //         stock: 'Available'

    //     },
    //     {
    //         id: 3,
    //         name: "Wooden  Frame",
    //         coverPhoto: Cover3,
    //         framePhoto: Wooden,
    //         availableSizes: [
    //             { height: 4, width: 6 },
    //             { height: 5, width: 7 },
    //             { height: 8, width: 10 }
    //         ],
    //         stock: 'Available'

    //     },
    //     {
    //         id: 4,
    //         name: "Modern Metallic Frame",
    //         coverPhoto: Cover2,
    //         framePhoto: Metallic,
    //         availableSizes: [
    //             { height: 5, width: 7 },
    //             { height: 8, width: 10 },
    //             { height: 11, width: 14 }
    //         ],
    //         stock: 'Available'

    //     },
    //     {
    //         id: 5,
    //         name: "Baroque  Frame",
    //         coverPhoto: Cover1,
    //         framePhoto: Barque,
    //         availableSizes: [
    //             { height: 4, width: 6 },
    //             { height: 5, width: 7 },
    //             { height: 8, width: 10 }
    //         ],
    //         stock: 'Available'

    //     },
    //     {
    //         id: 6,
    //         name: "Wooden  Frame",
    //         coverPhoto: Cover3,
    //         framePhoto: Wooden,
    //         availableSizes: [
    //             { height: 4, width: 6 },
    //             { height: 5, width: 7 },
    //             { height: 8, width: 10 }
    //         ],
    //         stock: 'Available'

    //     }
    // ])

    // let [services, setServices] = useState([
    //     {
    //         id: 1,
    //         name: "Wedding Photography",
    //         description: "Comprehensive wedding photography service.",
    //         coverPhoto: photo,
    //         price: 1500
    //     },
    //     {
    //         id: 2,
    //         name: "Event Videography",
    //         description: "Professional videography for events. ",
    //         coverPhoto: video,
    //         price: 2000
    //     }
    // ])

    // let [orders, setOrder] = useState([
    //     {
    //         id: 1,
    //         customerName: "Alice Johnson",
    //         email: "alicejohnson@example.com",
    //         date: '2025-01-03',
    //         contact: "1122334455",
    //         address: "123 Elm Street, Springfield",
    //         productId: 1,
    //         frameName: 'Classic Wooden Frame',
    //         size: { height: 5, width: 7 },
    //         quantity: 2,

    //         status: "Processing" // Can be "Pending", "Processing", "Shipped", or "Delivered"
    //     },
    //     {
    //         id: 2,
    //         customerName: "Bob Brown",
    //         email: "bobbrown@example.com",
    //         date: '2025-01-04',
    //         contact: "6677889900",
    //         address: "456 Oak Avenue, Metropolis",
    //         photo: "",
    //         productId: 2,
    //         frameName: 'Modern Metallic Frame',
    //         size: { height: 11, width: 14 },
    //         quantity: 1,
    //         status: "Shipped"
    //     }
    // ])


    // 


    let data = { setAdmin, isAuth, setAuth, isadmin, products, setProducts, services, setServices, orders, setOrder, bookings, setBookings }
    return (
        <Contextuse.Provider value={data}>
            {props.children}
        </Contextuse.Provider>
    )
}
