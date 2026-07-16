import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown, Search } from 'lucide-react';
import Navbar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';

const announcements = [
  {
    id: 1,
    date: 'November 2, 2025',
    title: 'Rabies Vaccination Campaign – November 2025',
    description:
      'A free vaccination program for dogs and cattle will be held in Haldummulla town from Nov 10–15. Bring your animals to the central field clinic for treatment.',
    category: 'Vaccination Program',
  },
  {
    id: 2,
    date: 'October 25, 2025',
    title: 'Dairy Farm Health Workshop',
    description:
      'A special workshop on cow nutrition and disease prevention will be held at the Veterinary Office hall on Nov 20.',
    category: 'Awareness Program',
  },
  {
    id: 3,
    date: 'October 10, 2025',
    title: 'Field Visit Registration',
    description:
      'Farmers can now book field visits for animal checkups and breeding consultations through our online appointment portal.',
    category: 'Farmer Service',
  },
  {
    id: 4,
    date: 'September 28, 2025',
    title: 'Artificial Insemination Program for Dairy Cattle',
    description:
      'The veterinary office will conduct an artificial insemination program for dairy cattle to improve milk yield and breeding efficiency. Farmers can register at the office before October 5 to participate in the program.',
    category: 'Breeding Service',
  },
];

const categories = [
  'All Categories',
  'Vaccination Program',
  'Awareness Program',
  'Farmer Service',
  'Breeding Service',
];

const categoryColors = {
  'Vaccination Program': { bg: '#E6F7F5', text: '#0D9488' },
  'Awareness Program':   { bg: '#E6F7F5', text: '#0D9488' },
  'Farmer Service':      { bg: '#E6F7F5', text: '#0D9488' },
  'Breeding Service':    { bg: '#E6F7F5', text: '#0D9488' },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

export default function Announcements() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filtered = announcements.filter((a) => {
    const matchSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      selectedCategory === 'All Categories' || a.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <>
      <Navbar />

      {/* Page Header */}
      <div className="bg-gradient-to-b from-emerald-100 via-gray-50 to-white px-6 py-10 md:px-16">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-gray-900"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          Announcements &amp; Notices
        </motion.h1>
        <motion.p
          className="text-gray-500 mt-1 text-sm md:text-base"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
        >
          Stay updated with the latest veterinary programs and news.
        </motion.p>
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 min-h-screen px-6 md:px-16 py-8">

        {/* Search & Filter Row */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
        >
          {/* Search Box */}
          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search announcements..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 px-5 py-2.5 border border-gray-300 rounded-md bg-white text-sm text-gray-700 hover:border-teal-400 transition min-w-[180px] justify-between"
            >
              <span>{selectedCategory}</span>
              <ChevronDown
                size={16}
                className={`text-gray-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-52 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setDropdownOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-teal-50 hover:text-teal-700 ${
                      selectedCategory === cat
                        ? 'text-teal-700 bg-teal-50 font-medium'
                        : 'text-gray-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Announcement Cards */}
        <div className="flex flex-col gap-4">
          {filtered.length === 0 ? (
            <motion.p
              className="text-center text-gray-500 py-16"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              No announcements found.
            </motion.p>
          ) : (
            filtered.map((item, index) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
                style={{ borderLeft: '4px solid #0D9488' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={index}
              >
                <div className="p-5 md:p-6">
                  {/* Top row: date + category badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Calendar size={14} className="text-gray-400" />
                      <span>{item.date}</span>
                    </div>
                    <span
                      className="self-start sm:self-auto text-xs font-medium px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: categoryColors[item.category]?.bg || '#E6F7F5',
                        color: categoryColors[item.category]?.text || '#0D9488',
                      }}
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
