import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("No token found. Please login again.");
        navigate("/");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);


        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          alert("Session expired or unauthorized. Please login again.");
          localStorage.removeItem("token");
          navigate("/");
        } else {
          alert("Failed to fetch user data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) {
    return <div className="p-6 text-center">Loading user data...</div>;
  }

  if (!user) {
    return <div className="p-6 text-center text-red-600">User data not found.</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f0f4f8]">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#1f6767]">User Profile</h2>
        <div className="space-y-3 mb-6">
          <div><strong>Name:</strong> {user.username}</div>
          <div><strong>Email:</strong> {user.email}</div>
          <div><strong>Contact:</strong> {user.contact}</div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full py-2 bg-[#1f6767] text-white rounded hover:bg-[#165353] transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserPage;
