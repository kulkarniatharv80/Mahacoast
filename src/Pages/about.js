import React from "react";
import Header from "../Componants/Header";
import Footer from "../Componants/Footer";

const teamMembers = [
  { name: "Prathmesh Jagtap", role: "Frontend Developer & UIUX Designer" },
  { name: "Prajakta Jadhav", role: "Backend Developer" },
  { name: "Mousam Thakur", role: "Documentation & Research Lead" },
  { name: "Atharv Kulkarni", role: "Frontend & Backend Developer" },
];

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#e6f2f2] text-[#1f6767] font-sans">
      <Header />

      <main className="flex-grow px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-10">About MahaCoast</h1>
        <p className="max-w-3xl mx-auto text-lg leading-relaxed mb-16 text-center">
          MahaCoast is your smart travel companion for Maharashtra’s beautiful beaches. It helps users
          access real-time information about beach conditions, nearby hotels, and safety alerts —
          so you can plan your visit confidently and enjoy a worry-free experience along the coast.
        </p>

        <h2 className="text-2xl font-semibold text-center mb-8">Meet Our Team</h2>

        <div className="max-w-5xl mx-auto flex justify-between border-t-4 border-[#1f6767] pt-8 flex-wrap gap-8">
          {teamMembers.map(({ name, role }) => (
            <div
              key={name}
              className="flex-1 min-w-[150px] text-center text-[#144d4d]"
            >
              <p className="font-semibold mb-1">{name}</p>
              <p className="italic text-sm">{role}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
