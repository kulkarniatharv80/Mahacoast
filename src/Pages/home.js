import React from "react";
import Footer from "../Componants/Footer";
import { Link } from "react-router-dom";


function HomePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <nav className="bg-[#014d4d]/60 backdrop-blur-sm text-white w-full shadow-md fixed top-0 z-20">

                <div className="flex items-center h-16 px-10 space-x-6">
                    <a href="#" className="p-1">
                        <img src="/Logo.png" alt="Logo" className="h-32" />
                    </a>
                    <Link to="/about" className="text-white text-lg font-medium hover:underline">About</Link>
                </div>
            </nav>

            <main className="relative flex-grow">
                <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
                    <video
                        src="/wave.mp4"
                        autoPlay
                        loop
                        muted
                        className="w-full h-full object-cover"
                    ></video>
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                </div>
                <div className="relative z-10 flex flex-col lg:flex-row h-full">
                    {/* Left section (empty or image later) */}
                    <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
                    </div>

                    {/* Right section with MahaCoast info */}
                    <div className="w-full lg:w-1/2 p-8 flex items-center justify-center">
                        <div className="text-white max-w-md">
                            <h1 className="text-4xl font-bold mb-4 mt-56">Welcome to MahaCoast</h1>
                            <p className="text-lg mb-6">
                                Plan your perfect beach day with real-time updates on weather, and must-visit spots along Maharashtra's coastline.
                            </p>
                            <Link
                                to="/login"
                                className="inline-block bg-[#014d4d] text-white font-semibold py-2 px-4 rounded-lg transition transform hover:scale-105"
                            >
                                Explore Now →
                            </Link>


                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default HomePage;
