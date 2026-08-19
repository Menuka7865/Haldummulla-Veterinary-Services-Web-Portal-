import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, LogOut, User } from 'lucide-react';
import logoSteth from '../images/logoSteth.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);

  // Read user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      if (stored) setUser(JSON.parse(stored));
    } catch {
      setUser(null);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setDropdownOpen(false);
    window.location.href = '/home';
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    'Home',
    'Services',
    'Appointments',
    'Announcements',
    'Resources',
    'Contact',
  ];

  // Get initials from name (first letter only)
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : '?');

  return (
    <nav className="bg-white shadow-sm relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 group">
            <img
              src={logoSteth}
              alt="Haldummulla Vet Logo"
              className="h-8 w-8 transition-transform group-hover:scale-105"
            />
            <span className="text-xl font-semibold text-teal-600 group-hover:text-teal-700 transition-colors">
              Haldummulla Vet
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gray-700 hover:text-teal-600 transition-colors duration-200 text-sm font-medium"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Desktop Right Side — Auth Buttons or User Avatar */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              /* ── Logged-in: Avatar + Dropdown ── */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-teal-600 text-white text-sm font-bold hover:bg-teal-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
                  title={user.name}
                  aria-label="User menu"
                >
                  {getInitial(user.name)}
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    {/* User info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                          {getInitial(user.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                          <p className="text-xs text-gray-400 truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={15} />
                      <span>Log out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ── Logged-out: Login + Register ── */
              <>
                <a
                  href="/login"
                  className="text-gray-700 hover:text-teal-600 transition-colors duration-200 text-sm font-medium"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors duration-200 text-sm font-medium"
                >
                  Register
                </a>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-teal-600 hover:bg-gray-100 transition-colors duration-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-3 bg-white border-t">
          {navItems.map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase()}`}
              className="block text-gray-700 hover:text-teal-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors duration-200 text-sm font-medium"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}

          {/* Mobile Auth Section */}
          <div className="pt-3 space-y-2 border-t">
            {user ? (
              /* Logged-in mobile */
              <>
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                    {getInitial(user.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="flex items-center gap-2 w-full text-left text-red-600 hover:bg-red-50 px-3 py-2 rounded-md transition-colors duration-200 text-sm font-medium"
                >
                  <LogOut size={15} />
                  <span>Log out</span>
                </button>
              </>
            ) : (
              /* Logged-out mobile */
              <>
                <a
                  href="/login"
                  className="block w-full text-left text-gray-700 hover:text-teal-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors duration-200 text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="block w-full text-center bg-teal-600 text-white px-3 py-2 rounded-md hover:bg-teal-700 transition-colors duration-200 text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}