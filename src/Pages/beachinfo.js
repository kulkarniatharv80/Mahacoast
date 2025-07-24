import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BeachInfo from '../Componants/BeachInfo';
import Header from '../Componants/Header';
import Footer from '../Componants/Footer';
import Temp from '../Componants/Temp';


const InfoPage = () => {
  const { id } = useParams();
  const [beach, setBeach] = useState(null);

  useEffect(() => {
    const fetchBeach = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/beaches/${id}`);
        setBeach(res.data);
      } catch (err) {
        console.error('Error fetching beach:', err);
      }
    };

    fetchBeach();
  }, [id]);

  if (!beach) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />

      <div className="p-4 bg-[#014d4d]">
        <BeachInfo beach={beach} />

        <div className="mt-6">
          <Temp coordinates={beach.position} />
        </div>
      </div>

      <div className="bg-[#014d4d] py-10">
        <div className="w-[98%] mx-auto bg-white p-8  shadow-lg">
          <h2 className="text-3xl font-bold text-[#014d4d] mb-8">Famous Spots Nearby</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beach.famous_spots?.map((spot, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
                <img src={spot.img} alt={spot.name} className="w-full h-52 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{spot.name}</h3>
                  <p className="text-gray-600 mb-4">{spot.description}</p>
                  <a
                    href={spot.map_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#014d4d] text-white px-4 py-2 rounded-md hover:bg-[#023737]"
                  >
                    View on Map
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



      <Footer />
    </div>
  );

};

export default InfoPage;
