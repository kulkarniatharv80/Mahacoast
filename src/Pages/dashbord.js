import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Footer from '../Componants/Footer';
import Beachcard from '../Componants/Beachcard';
import Map from '../Componants/Map';
import Header from '../Componants/Header';

const Dashbord = () => {
  const navigate = useNavigate();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [beachData, setBeachData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [preferredMonth, setPreferredMonth] = useState("");
  const [preferredRegion, setPreferredRegion] = useState("");
  const [recommendedBeaches, setRecommendedBeaches] = useState(null);



  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Access Denied. Please login.");
      navigate("/login");
    } else {
      setIsAuthChecked(true);

      fetch("http://localhost:5000/api/beaches", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch beach data');
          }
          return response.json();
        })
        .then((data) => {
          console.log("✅ Fetched beach data:", data);
          setBeachData(data);
        })
        .catch((error) => {
          console.error("❌ Error fetching beach data:", error);
        });

    }
  }, [navigate]);

  if (!isAuthChecked) return null;

  const handleBeachClick = (beachId) => {
    navigate(`/beachinfo/${beachId}`);
  };



  const filteredBeaches = beachData.filter((beach) =>
    beach.beach_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Header />


        <div className="flex flex-1 bg-gray-300 relative min-h-[calc(100vh-80px)]">

          {/* Left Section */}
          <div className="w-full md:w-1/2 p-4 z-10">

            <div className="mb-4 flex flex-col md:flex-row gap-4 items-center">
              {/* Search Box */}
              <div className="relative w-full md:w-3/4">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search for a beach..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-[10px] text-base rounded-md border border-gray-300"
                />
              </div>


              <button
                onClick={() => setIsPopupOpen(true)}
                className="w-full md:w-auto bg-[#014d4d] text-white font-semibold py-[10px] px-6 rounded-md text-base text-center transition transform hover:scale-105"
              >
                Recommendation
              </button>
            </div>

            {/* Beach Cards List */}
            <div className="overflow-y-auto max-h-[75vh] scrollbar-hide">
              {beachData.length === 0 ? (
                <p className="text-center text-gray-700 mt-4">
                  Loading beaches...
                </p>
              ) : (
                (recommendedBeaches ? recommendedBeaches : filteredBeaches).length > 0 ? (
                  (recommendedBeaches ? recommendedBeaches : filteredBeaches).map((beach) => (
                    <Beachcard
                      key={beach._id}
                      id={beach._id}
                      image={beach.beach_images[0]}
                      name={beach.beach_name}
                      location={beach.location}
                      description={beach.description}
                      month={beach.best_months.join(', ')}
                    />
                  ))
                ) : (
                  <p className="text-center text-gray-700 mt-4">
                    No beaches found.
                  </p>
                )
              )}


            </div>
          </div>

          {/* right Section */}
          <div className="w-full md:w-1/2 relative z-10">
            <Map />
          </div>

        </div>


        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-80 relative z-60">
              <h2 className="text-xl font-bold mb-4">Get Beach Recommendation</h2>

              <div className="mb-4">
                <label className="block mb-1 font-semibold">Preferred Month:</label>
                <select
                  value={preferredMonth}
                  onChange={(e) => setPreferredMonth(e.target.value)}
                  className="border rounded w-full p-2"
                >
                  <option value="">Select Month</option>
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-1 font-semibold">Preferred Region:</label>
                <select
                  value={preferredRegion}
                  onChange={(e) => setPreferredRegion(e.target.value)}
                  className="border rounded w-full p-2"
                >
                  <option value="">Select Region</option>
                  {["Raigad", "Mumbai Suburban", "Sindhudurg", "Ratnagiri ", "Palghar"].map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={() => {
                    setIsPopupOpen(false);
                    setRecommendedBeaches(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="bg-[#014d4d] text-white px-4 py-2 rounded hover:bg-[#013636]"
                  onClick={() => {
                    const recommended = beachData.filter((beach) => {
                      const region = beach.region?.toLowerCase();
                      const monthMatch = preferredMonth
                        ? beach.best_months.map(m => m.toLowerCase()).includes(preferredMonth.toLowerCase())
                        : true;
                      const regionMatch = preferredRegion
                        ? region?.includes(preferredRegion.toLowerCase())
                        : true;
                      return monthMatch && regionMatch;
                    });

                    console.log("Filtered beaches:", recommended);
                    setRecommendedBeaches(recommended);
                    setIsPopupOpen(false);
                  }}
                >
                  Recommend Me
                </button>


              </div>
            </div>
          </div>
        )}


      </main>
      <Footer />
    </div>
  );


};

export default Dashbord;
