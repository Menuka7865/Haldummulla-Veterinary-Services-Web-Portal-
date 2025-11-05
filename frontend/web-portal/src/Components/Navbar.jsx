import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logoSteth from '../images/logoSteth.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);


  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    'Home',
    'Services',
    'Appointments',
    'Announcements',
    'Resources',
    'Contact'
  ];

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src={logoSteth}
              alt="Haldummulla Vet Logo"
              className="h-8 w-8"
            />
            <span className="text-xl font-semibold text-teal-600">Haldummulla Vet</span>
          </div>

          {/* Desktop Navigation */}
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

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="text-gray-700 hover:text-white transition-colors duration-200 text-sm font-medium border px-4 py-2 rounded-md hover:bg-[#F97015] ">
              Login
            </button>
            <button
              className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors duration-200 text-sm font-medium"
            >
              Register
            </button>
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
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
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
          <div className="pt-3 space-y-2 border-t">
            
            <button
              className="w-full text-left text-gray-700 hover:text-teal-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors duration-200 text-sm font-medium"
              onClick={() => {
                setIsOpen(false);
                navigate('/login');
              }}
            >
              Login
            </button>
            <button
              className="w-full bg-teal-600 text-white px-3 py-2 rounded-md hover:bg-teal-700 transition-colors duration-200 text-sm font-medium"
              onClick={() => {
                setIsOpen(false);
                navigate('/register');
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}