import React from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

function Home() {
  const features = [
    {
      id: 1,
      icon: "📆",
      title: "Online Appointment ",
      description: "Schedule veterinary appointments and field visits conveniently online"
    },
    {
      id: 2,
      icon: "📢",
      title: "Announcements ",
      description: "Stay updated with vaccination schedules and disease prevention alerts"
    },
    {
      id: 3,
      icon: "📖",
      title: "Educational Resources ",
      description: "Access guides and best practices for livestock and dairy farming"
    },
  ];

  const services = [
    {
      id: 1,
      icon: "🩺",
      title: "General Health Checkups ",
      description: "Regular health examinations for all types of livestock"
    },
    {
      id: 2,
      icon: "🛡️",
      title: "Vaccinations & Prevention ",
      description: "Comprehensive vaccination services and disease prevention"
    },
    {
      id: 3,
      icon: "❤️",
      title: "Emergency Care ",
      description: "24/7 emergency veterinary services for urgent cases"
    },
  ];

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <>
      <div>
        <Navbar />
        <motion.div
          className="bg-linear-to-b from-emerald-200 via-gray-50 to-slate-50 min-h-[50px]"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          {/* Hero Section */}
          <motion.h1
            className="text-3xl sm:text-4xl lg:text-6xl font-bold text-center pt-38"
            variants={fadeUp}
          >
            Haldummulla Veterinary <br /> <span>Services</span>
          </motion.h1>

          <motion.p
            className="lg:text-[25px] pt-2 text-center text-[#485454]"
            variants={fadeUp}
          >
            Providing Quality veterinary care and support to the Farming community
          </motion.p>

          <motion.div
            className="flex justify-center gap-6 pt-6"
            variants={fadeUp}
          >
            <a href="/appointments">
              <button className="text-white bg-teal-600 p-2 rounded-[10px] hover:bg-teal-700 cursor-pointer">
                Book Appointment
              </button>
            </a>
            <a href="/services">
              <button className="border-[0.5px] p-2 rounded-[10px] hover:bg-[#F97015] hover:text-white">
                Our Services
              </button>
            </a>
          </motion.div>

          {/* Platform Features */}
          <motion.div
            className="px-6 py-10 bg-gray-50 mt-30"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h3 className="text-3xl font-semibold text-center mb-10">Platform Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ml-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="bg-[#C6F0EB] w-12 h-12 flex items-center justify-center rounded-2xl mb-4 text-2xl">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Our Services */}
          <motion.div
            className="px-6 py-10 bg-gray-50"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h3 className="text-3xl font-semibold text-center mb-10">Our Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ml-3">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="bg-[#C6F0EB] w-12 h-12 flex items-center justify-center rounded-2xl mb-4 text-2xl">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-semibold mb-2">{service.title}</h4>
                  <p className="text-gray-600">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* View All Button */}
          <motion.div
            className="flex justify-center mb-10"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <a href="/services">
              <button className="border border-gray-300 px-6 py-2 rounded-[10px] hover:bg-[#F97015] hover:text-white transition-colors duration-200">
                View All Services
              </button>
            </a>
          </motion.div>

          {/* Vision & Mission */}
          <motion.div
            className="px-6 py-4 flex flex-col md:flex-row gap-6 justify-center mb-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <div className='border rounded-lg p-4 md:w-1/3'>
              <h3 className='text-2xl font-semibold'>Our Mission</h3>
              <p className='mt-2 text-[#748181]'>
                To provide accessible, high quality veterinary service to the Haldummulla farming community,
                ensuring the health and productivity of livestock while supporting sustainable agriculture practices.
              </p>
            </div>
            <div className='border rounded-lg p-4 md:w-1/3'>
              <h3 className='text-2xl font-semibold'>Our Vision</h3>
              <p className='mt-2 text-[#748181]'>
                To be the leading veterinary service provider in the region, fostering a healthy livestock population
                and empowering farmers with knowledge and resources for successful animal husbandry.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <Footer />
      </div>
    </>
  )
}

export default Home
