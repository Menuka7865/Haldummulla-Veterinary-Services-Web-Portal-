import React from "react";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const Services = () => {
  const features = [
    {
      id: 1,
      icon: "📆",
      title: "General Health Checkups",
      description:
        "Schedule veterinary appointments and field visits conveniently online",
    },
    {
      id: 2,
      icon: "📆",
      title: "Vaccination Programs ",
      description:
        "Schedule veterinary appointments and field visits conveniently online",
    },
    {
      id: 3,
      icon: "📆",
      title: "Emergency Care ",
      description:
        "Schedule veterinary appointments and field visits conveniently online",
    },
    {
      id: 3,
      icon: "📆",
      title: "Online Consultations ",
      description:
        "Schedule veterinary appointments and field visits conveniently online",
    },
    {
      id: 3,
      icon: "📖",
      title: "Educational Resources ",
      description:
        "Schedule veterinary appointments and field visits conveniently online",
    },
  ];
  return (
    <>
      <Navbar />
      <div className=" bg-linear-to-b from-emerald-200 via-gray-50 to-slate-50 min-h-[50px] h-[150px]">
        <h1 className=" text-xl lg:text-2xl text-[#485454] text-left pt-6 pl-10">
          Our Services
        </h1>
        <h1 className=" text-xl lg:text-2xl font-bold text-left pt-1 pl-10">
          Vacciumation Programs
        </h1>
        <h1 className=" text-[10px] text-[#485454] text-left pt-1 pl-10">
          Providing quality veterinary 
        </h1>
          <div className="px-6 py-10 pt-20 bg-gray-50 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ml-3 ">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className=" p-6 rounded-xl mb-20 shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
                >
                  <div className="bg-[#C6F0EB] w-12 h-12 flex items-center justify-center rounded-2xl mb-4 text-2xl">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center mb-25">
              <a href="#">
                <button className="border border-gray-300 px-6 py-2 rounded-[10px] hover:bg-[#F97015] hover:text-white transition-colors duration-200">
                  View Details
                </button>
              </a>
            </div>
          </div>
          <Footer/>
      </div>
    </>
  );
};

export default Services;
