import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./Pages/home";
import Login from "./Pages/login";
import Register from "./Pages/register";
import Dashbord from "./Pages/dashbord";
import BeachInfo from "./Pages/beachinfo";
import Trip from "./Pages/trip";
import AboutUs from "./Pages/about";
import UserPage from "./Pages/user";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashbord" element={<Dashbord />} />
        <Route path="/beachinfo/:id" element={<BeachInfo />} />
        <Route path="/trip" element={<Trip />}/>
        <Route path="/aboutus" element={<AboutUs/>}/>
        <Route path="/user" element={<UserPage/>}/>
      </Routes>
    </Router>
  )
}

export default App;
