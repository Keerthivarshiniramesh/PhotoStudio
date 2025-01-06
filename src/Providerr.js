import { createContext, useState } from "react"
import React from 'react'
import Cover1 from './assets/coverimage1.png'
import Barque from './assets/baroque.jpg'
import photo from './assets/photo.png'
import video from './assets/video.png'

export const Contextuse = createContext()

export default function Providerr(props) {

    // let [isadmin, setAdmin] = useState(null)

    let admins = [{
        email: 'demo12@gmail.com',
        pwd: 'Demo@1234'

    },
    {
        email: 're@gmail.com',
        pwd: 't_1'

    },
    {
        email: 'we@gmail.com',
        pwd: 't_2'

    },
    {
        email: 'de@gmail.com',
        pwd: 't_3'

    }]

    let [products, setProducts] = useState([
        {
            id: 1,
            name: "Classic Wooden Frame",
            coverPhoto: Cover1,
            framePhoto: Barque,
            availableSizes: [
                { height: 4, width: 6 },
                { height: 5, width: 7 },
                { height: 8, width: 10 }
            ],
            stock: 'Available'

        },
        {
            id: 2,
            name: "Modern Metallic Frame",
            coverPhoto: "modern_metallic_frame_cover.png",
            framePhoto: "modern_metallic_frame_border.png",
            availableSizes: [
                { height: 5, width: 7 },
                { height: 8, width: 10 },
                { height: 11, width: 14 }
            ],
            stock: 'Available'

        }
    ])

    let [services, setServices] = useState([
        {
            id: 1,
            name: "Wedding Photography",
            description: "Comprehensive wedding photography service.",
            coverPhoto: photo,
            price: 1500
        },
        {
            id: 2,
            name: "Event Videography",
            description: "Professional videography for events.",
            coverPhoto: video,
            price: 2000
        }
    ])

    let [orders, setOrder] = useState([
        {
            id: 1,
            customerName: "Alice Johnson",
            email: "alicejohnson@example.com",
            date: '2025-01-03',
            contact: "1122334455",
            address: "123 Elm Street, Springfield",
            productId: 1,
            frameName: 'Classic Wooden Frame',
            size: { height: 5, width: 7 },
            quantity: 2,

            status: "Processing" // Can be "Pending", "Processing", "Shipped", or "Delivered"
        },
        {
            id: 2,
            customerName: "Bob Brown",
            email: "bobbrown@example.com",
            date: '2025-01-04',
            contact: "6677889900",
            address: "456 Oak Avenue, Metropolis",
            photo: "",
            productId: 2,
            frameName: 'Modern Metallic Frame',
            size: { height: 11, width: 14 },
            quantity: 1,
            status: "Shipped"
        }
    ])

    let [bookings, setBookings] = useState([
        {
            id: 1,
            customerName: "John Doe",
            contact: "1234567890",
            email: "johndoe@example.com",
            address: "123 Elm Street, Springfield",
            startDate: "2024-01-01",
            endDate: "2024-01-02",
            serviceId: 1,
            serviceName: 'Wedding Photography',
            status: "Pending" // Can be "Pending", "Accepted", or "Rejected"
        },
        {
            id: 2,
            customerName: "Jane Smith",
            contact: "9876543210",
            email: "janesmith@example.com",
            address: "456 Oak Avenue, Metropolis",
            startDate: "2024-02-15",
            endDate: "2024-02-16",
            serviceId: 2,
            serviceName: 'Event Videography',
            status: "Accepted"
        }
    ])



    let data = { admins, products, setProducts, services, setServices, orders, setOrder, bookings, setBookings }
    return (
        <Contextuse.Provider value={data}>
            {props.children}
        </Contextuse.Provider>
    )
}
