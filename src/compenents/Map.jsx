import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const customIcon = () => {
  const svgIcon = `
    <svg width="32" height="45" viewBox="0 0 32 45" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 11.598 16 29 16 29s16-17.402 16-29c0-8.837-7.163-16-16-16z" fill="#014d4d"/>
      <circle cx="16" cy="16" r="6" fill="white"/>
    </svg>
  `;
  return new L.DivIcon({
    html: svgIcon,
    className: "",
    iconSize: [32, 45],
    iconAnchor: [16, 45],
    popupAnchor: [0, -45],
  });
};

const beachLocations = [
  { name: 'Alibaug Beach', position: [18.6390, 72.8721] },
  { name: 'Tarkarli Beach', position: [16.05, 73.48] },
  { name: 'Ganpatipule Beach', position: [17.1448, 73.2666] },
  { name: 'Harihareshwar Beach', position: [17.9951, 73.0206] },
  { name: 'Murud Beach', position: [18.3292, 72.9544] },
  { name: 'Versova Beach', position: [19.127, 72.816] },
  { name: 'Kelwa Beach', position: [19.6116, 72.7302] },
  { name: 'Vijaydurg Beach', position: [16.55, 73.35] },
  { name: 'Jaigad Beach', position: [17.3, 73.2] },
  { name: 'Shrivardhan Beach', position: [18.0333, 73.0167] },
  { name: 'Diveagar Beach', position: [18.192, 72.9789] },
  { name: 'Mandavi Beach', position: [16.9893, 73.2843] },
  { name: 'Harnai Beach', position: [17.8, 73.1] },
  { name: 'Kashid Beach', position: [18.4471, 72.9025] },
  { name: 'Devgad Beach', position: [16.3738, 73.3717] }
];

const Map = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBeach, setSelectedBeach] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBeach) {
      navigate(`/trip?beach=${encodeURIComponent(selectedBeach)}`);
    }
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={[19.0, 72.9]}
        zoom={8}
        className="w-full h-full z-0"
        style={{ zIndex: 0 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {beachLocations.map((beach, index) => (
          <Marker
            key={index}
            position={beach.position}
            icon={customIcon()}
          >
            <Popup>{beach.name}</Popup>
          </Marker>
        ))}
      </MapContainer>

      <button
        onClick={() => setShowPopup(true)}
        className="absolute bottom-4 left-4 z-50 bg-[#014d4d] text-white w-16 h-16 ml-8 rounded-full flex items-center justify-center shadow-lg hover:bg-[#013636] transition"
        title="Plan Your Trip"
      >
        <img
          src="/trip.png"
          alt="Plan"
          className="w-12 h-12"
        />
      </button>

      {showPopup && (
        <div className="absolute inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-96 shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-[#014d4d]">Plan Your Trip</h2>
            <form onSubmit={handleSubmit}>
              <select
                value={selectedBeach}
                onChange={(e) => setSelectedBeach(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-[#014d4d]"
                required
              >
                <option value="">Select a beach</option>
                {beachLocations
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((beach, idx) => (
                    <option key={idx} value={beach.name}>{beach.name}</option>
                  ))}
              </select>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#014d4d] text-white rounded hover:bg-[#013636]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
