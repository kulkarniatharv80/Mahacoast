import React, { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import axios from "axios";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", {
                username,
                email,
                contact,
                password
            });

            alert(res.data.message);
        } catch (error) {
            alert("Signup Failed!");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#227777] flex-col">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 h-auto flex flex-col justify-between">

                <form onSubmit={handleSubmit} className="space-y-4">
                    <h1 className="font-Poppins font-bold text-xl text-center text-[#014d4d]">Create Account</h1>

                    <div className="flex items-center border border-gray-400 rounded px-2">
                        <FaUser className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="flex-1 p-2 text-black bg-transparent focus:outline-none"
                            required
                        />
                    </div>

                    <div className="flex items-center border border-gray-400 rounded px-2">
                        <FaEnvelope className="text-gray-500 mr-2" />
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
                        <FaPhone className="text-gray-500 mr-2" />
                        <input
                            type="tel"
                            placeholder="Contact Number"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            className="flex-1 p-2 text-black bg-transparent focus:outline-none"
                            pattern="[0-9]{10}"
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
                        Sign Up
                    </button>
                </form>

                <div className="w-full mt-10 flex justify-center">
                    <img src="beach2.png" alt="Register visual" className="w-64 h-24 object-cover" />
                </div>
            </div>

            <a href="/login" className="text-white underline mt-3 ml-80">Log In</a>
        </div>
    );
};

export default Register;
