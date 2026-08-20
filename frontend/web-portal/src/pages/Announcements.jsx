import { API_BASE_URL } from '../config';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown, Search, Loader2, AlertCircle, Megaphone } from 'lucide-react';
import Navbar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';

const API_BASE = `${API_BASE_URL}/announcements`;

const CATEGORIES = [
  'All Categories',
  'Vaccination Program',
  'Awareness Program',
  'Farmer Service',
  'Breeding Service',
  'General',
];

const categoryColors = {
  'Vaccination Program': { bg: '#E6F7F5', text: '#0D9488' },
  'Awareness Program':   { bg: '#FEF9C3', text: '#B45309' },
  'Farmer Service':      { bg: '#EDE9FE', text: '#7C3AED' },
  'Breeding Service':    { bg: '#FCE7F3', text: '#BE185D' },
  'General':             { bg: '#E6F7F5', text: '#0D9488' },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

// Format a date string to a readable format (e.g. "2026-07-10" → "July 10, 2026")
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fetch only Active announcements from the backend
  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      setFetchError('');
      try {
        const res = await fetch(`${API_BASE}?status=Active`);
        if (!res.ok) {
          throw new Error(`Server responded with status ${res.status}`);
        }
        const data = await res.json();
        setAnnouncements(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch announcements:', err.message);
        setFetchError('Unable to load announcements. Please check your connection or try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

  // Client-side filtering by search text and category
  const filtered = announcements.filter((a) => {
    const matchSearch =
      (a.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (a.content || '').toLowerCase().includes(search.toLowerCase());
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
                {CATEGORIES.map((cat) => (
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

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin mb-3 text-teal-500" />
            <p className="text-sm">Loading announcements…</p>
          </div>
        )}

        {/* Error State */}
        {!loading && fetchError && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm max-w-xl mx-auto">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{fetchError}</span>
          </div>
        )}

        {/* Announcement Cards */}
        {!loading && !fetchError && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length === 0 ? (
              /* Empty State */
              <motion.div
                className="col-span-full flex flex-col items-center justify-center py-20 text-gray-400"
                initial="hidden"
                animate="visible"
                variants={fadeUp}
              >
                <Megaphone className="w-12 h-12 mb-4 text-teal-200" strokeWidth={1.5} />
                <p className="text-base font-medium text-gray-500">No announcements found</p>
                <p className="text-sm mt-1 text-gray-400">
                  {announcements.length === 0
                    ? 'There are no active announcements at the moment.'
                    : 'Try adjusting your search or filter.'}
                </p>
              </motion.div>
            ) : (
              filtered.map((item, index) => (
                <motion.div
                  key={item._id}
                  className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col"
                  style={{ borderLeft: '4px solid #0D9488' }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={index}
                >
                  <div className="p-5 md:p-6 flex flex-col flex-1">
                    {/* Top row: date + category badge */}
                    <div className="flex flex-col items-start gap-2 mb-3">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Calendar size={14} className="text-gray-400" />
                        <span>{formatDate(item.date)}</span>
                      </div>
                      {item.category && (
                        <span
                          className="self-start sm:self-auto text-xs font-medium px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: categoryColors[item.category]?.bg || '#E6F7F5',
                            color: categoryColors[item.category]?.text || '#0D9488',
                          }}
                        >
                          {item.category}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h2>

                    {/* Content (description) */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
