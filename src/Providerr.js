import { createContext, useState } from "react"
import React from 'react'
import Cover1 from './assets/coverimage1.png'
import Barque from './assets/baroque.jpg'

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

    const [products, setProducts] = useState([
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

    let data = { admins, products, setProducts }
    return (
        <Contextuse.Provider value={data}>
            {props.children}
        </Contextuse.Provider>
    )
}
