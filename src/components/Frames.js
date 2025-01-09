import React, { useContext, useState } from 'react';
import { Contextuse } from '../Providerr';
import logo from '../assets/ADS_bg_Logo.png';

export default function Frames() {
    let { products } = useContext(Contextuse); // Get products from the context

    // Set initial state for the current index of products (acting as testimonials)
    const [currentIndex, setCurrentIndex] = useState(0);

    // Handle next testimonial
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    };

    // Handle previous testimonial
    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    };

    // Get the current product based on the currentIndex
    const { framePhoto } = products[currentIndex];

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
            <main className="d-flex justify-content-center align-items-center m-4">
                <div className="py-5 bg-light">
                    <div className="container text-center">
                        <h3 className="text-2xl font-bold mb-4">Testimonials</h3>

                        <div className="card mx-auto shadow-lg rounded-3 p-4" style={{ maxWidth: '600px' }}>
                            <div className="card-body">
                                <div className="d-flex justify-content-center mb-4">
                                    <img
                                        src={framePhoto}

                                        className="rounded-circle shadow-lg"
                                        width="100"
                                        height="100"
                                    />
                                </div>
                            </div>
                            {/* Navigation Buttons */}
                            <div className="d-flex justify-content-between mt-4">
                                <button onClick={handlePrevious} className="btn btn-secondary">
                                    Previous
                                </button>
                                <button onClick={handleNext} className="btn btn-secondary">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
