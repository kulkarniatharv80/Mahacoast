import React from 'react';

const BeachInfo = ({ beach }) => {
    const handleMapClick = (e) => {
        e.stopPropagation();
        window.open(beach.map_url, '_blank');
    };

    return (
        <div className="bg-white shadow-md p-4">
            <div className="flex flex-col md:flex-row">
                {/* Left Section (Image) */}
                <div className="w-full md:w-1/3 mb-6 md:mb-0">
                    <img
                        src={beach.beach_images.length > 0 ? beach.beach_images[1] : '/default-beach.jpg'}  // Default image if none available
                        alt={beach.beach_name}
                        className="w-full h-80 object-cover rounded-md"
                    />
                </div>

                {/* Right Section*/}
                <div className="w-full md:w-2/3 md:pl-4 flex flex-col justify-between">
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold">{beach.beach_name}</h1>
                        <p className="text-[#014d4d] font-semibold text-sm">
                            Best months to visit: {beach.best_months}
                        </p>
                        <p className="text-gray-600 text-sm">{beach.location}</p>
                        <button
                            onClick={handleMapClick}
                            className="mt-1 bg-[#014d4d] text-white px-4 py-2 rounded hover:bg-[#013636] w-max text-sm"
                        >
                            View on Map
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">Beach Information</h2>
                <p className="text-gray-600">{beach.information}</p>
            </div>

            {beach.sport_activities && beach.sport_activities.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4">Popular Activities</h2>
                    <div className="flex flex-wrap gap-3">
                        {beach.sport_activities.map((activity, index) => (
                            <div
                                key={index}
                                className="bg-[#e0f7f7] text-[#014d4d] px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-[#d0f0f0] transition"
                            >
                                {activity}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

}

export default BeachInfo;
