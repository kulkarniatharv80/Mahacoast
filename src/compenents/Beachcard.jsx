import React from 'react';
import { useNavigate } from 'react-router-dom';

const Beachcard = ({ image, id, name, location, description, month }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/beachinfo/${id}`);
    };

    return (
        <div
            className="flex bg-[#ffffff] shadow-lg rounded-lg overflow-hidden h-60 w-full mx-auto my-4 cursor-pointer"
            onClick={handleCardClick}
        >
            <div className="w-2/4">
                <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 w-3/4">
                <h2 className="text-xl font-bold">{name}</h2>
                <h3 className="text-gray-500">{location}</h3>
                <p className="mt-4 text-gray-700">{description}</p>
                <p className="mt-2 text-sm font-semibold text-[#014d4d]">Best months to visit: {month}</p>
            </div>
        </div>
    );
};

export default Beachcard;
