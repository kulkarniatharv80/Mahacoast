import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });

            if (res.data.success) {
                alert("Login Successful!");
                localStorage.setItem("token", res.data.token);
                navigate("/dashbord");
            } else {
                alert(res.data.message || "Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error.response ? error.response.data : error.message);
            alert(error.response?.data?.message || "Something went wrong, please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#227777] flex-col">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 h-96 flex flex-col justify-between">


                <form onSubmit={handleSubmit} className="space-y-4">
                    <h1 className="font-Poppins font-bold text-xl text-center text-[#014d4d]">Welcome</h1>


                    <div className="flex items-center border border-gray-400 rounded px-2">
                        <FaUser className="text-gray-500 mr-2" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 p-2 text-black bg-transparent focus:outline-none"
                            required
                        />
                    </div>

                    <div className="flex items-center border border-gray-400 rounded px-2">
                        <FaLock className="text-gray-500 mr-2" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="flex-1 p-2 text-black bg-transparent focus:outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-[#1f6767] text-white rounded hover:bg-[#165353] transition duration-300"
                    >
                        Login
                    </button>
                </form>
                <div className="w-full mt-12 flex justify-center">
                    <img src="beach.png" alt="Login visual" className="w-64 h-24 object-cover" />
                </div>

            </div>

            <a href="/register" className="text-white underline mt-3 ml-80">Register</a>
        </div>

    );
};

export default Login;
