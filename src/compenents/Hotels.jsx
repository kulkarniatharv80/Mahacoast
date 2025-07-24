import React, { useEffect, useState } from "react";
import axios from "axios";

const beachLocations = [
    { name: "Alibaug Beach", position: [18.639, 72.8721] },
    { name: "Tarkarli Beach", position: [16.05, 73.48] },
    { name: "Ganpatipule Beach", position: [17.1448, 73.2666] },
    { name: "Harihareshwar Beach", position: [17.9951, 73.0206] },
    { name: "Murud Beach", position: [18.3292, 72.9544] },
    { name: "Versova Beach", position: [19.127, 72.816] },
    { name: "Kelwa Beach", position: [19.6116, 72.7302] },
    { name: "Vijaydurg Beach", position: [16.55, 73.35] },
    { name: "Jaigad Beach", position: [17.3, 73.2] },
    { name: "Shrivardhan Beach", position: [18.0333, 73.0167] },
    { name: "Diveagar Beach", position: [18.192, 72.9789] },
    { name: "Mandavi Beach", position: [16.9893, 73.2843] },
    { name: "Harnai Beach", position: [17.8, 73.1] },
    { name: "Kashid Beach", position: [18.4471, 72.9025] },
];

const getAddress = (location) => {
    if (!location) return "Address not available";
    if (location.formatted_address) return location.formatted_address;
    const parts = [
        location.address,
        location.locality,
        location.region,
        location.postcode,
    ].filter(Boolean);
    return parts.join(", ") || "Address not available";
};

const Hotels = ({ selectedBeach }) => {
    const [hotelData, setHotelData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = "fsq3a/UcbeTbVdADQSusGnCzVAPqnhQyYmwLViiWpCsJXv0=";
    const url = `https://api.foursquare.com/v3/places/search`;

    useEffect(() => {
        setError(null);
        setHotelData([]);
    }, [selectedBeach]);

    useEffect(() => {
        if (!selectedBeach) return;

        if (!API_KEY) {
            setError("API key is missing. Please set your FOURSQUARE API key.");
            return;
        }

        const beach = beachLocations.find((b) => b.name === selectedBeach);
        if (!beach) {
            setError("Selected beach not found");
            return;
        }

        const fetchHotels = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(url, {
                    headers: {
                        Accept: "application/json",
                        Authorization: API_KEY,
                    },
                    params: {
                        query: "hotel",
                        ll: `${beach.position[0]},${beach.position[1]}`,
                        radius: 5000,
                        limit: 10,
                        sort: "DISTANCE",
                        fields: "name,location,categories,geocodes,price",
                    },
                });
                setHotelData(response.data.results);
            } catch (err) {
                console.error(`Error fetching hotels for ${selectedBeach}:`, err);
                setError("Failed to fetch hotels. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, [selectedBeach, API_KEY]);

    if (!selectedBeach) {
        return <p className="p-4 text-center">Please select a beach to see nearby hotels.</p>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-6">Nearby Hotels for {selectedBeach}</h2>

            {loading && <p>Loading hotels...</p>}
            {error && <p className="text-red-600 mb-4">{error}</p>}

            {!loading && !error && hotelData.length === 0 && (
                <p className="text-sm italic text-gray-500">No hotels found nearby.</p>
            )}

            {!loading && !error && hotelData.length > 0 && (
                <ul className="space-y-4">
                    {hotelData.map((hotel) => {
                        const mapsUrl = hotel.geocodes?.main
                            ? `https://www.google.com/maps/search/?api=1&query=${hotel.geocodes.main.latitude},${hotel.geocodes.main.longitude}`
                            : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.name)}`;

                        return (
                            <li
                                key={hotel.fsq_id}
                                className="border rounded shadow p-4 bg-[#e6f2f2]"
                            >
                                <h4 className="font-bold text-lg">{hotel.name}</h4>
                                <p className="text-sm text-gray-600">{getAddress(hotel.location)}</p>
                                <p className="text-sm">Category: {hotel.categories?.[0]?.name || "N/A"}</p>
                                {hotel.price && (
                                    <p className="text-sm">Price Tier: <strong>{hotel.price}</strong></p>
                                )}
                                <a
                                    href={mapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline mt-2 inline-block"
                                >
                                    View Path
                                </a>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default Hotels;
