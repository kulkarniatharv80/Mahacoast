
import React from "react";
import { useLocation } from "react-router-dom";
import Hotels from "../Componants/Hotels";
import Header from "../Componants/Header";
import Footer from "../Componants/Footer";
const Trip = () => {
    const location = useLocation();


    const params = new URLSearchParams(location.search);
    const selectedBeach = params.get("beach") || "";

    return (
        <div className="flex flex-col min-h-screen bg-[#ffffff] text-[#1f6767] font-sans">
            <Header />
            <div className="flex flex-col min-h-screen text-[#1f6767] font-sans pr-28 pl-28">
                <Hotels selectedBeach={selectedBeach} />
            </div>
            <Footer />
        </div>

    );
};

export default Trip;
