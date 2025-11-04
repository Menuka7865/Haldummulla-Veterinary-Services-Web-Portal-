import React from 'react';
import { Facebook } from 'lucide-react';

export default function VetFooter() {
  return (
    <footer className="bg-teal-500 text-black py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start space-y-4 md:flex-1">
            <div className="flex items-center space-x-2">
              <svg 
                className="w-10 h-10 text-white" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Haldummulla Vet</h2>
            <p className="text-sm md:text-base text-center md:text-left max-w-xs text-[#283030]">
              Providing quality veterinary care and support to the farming community
            </p>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center md:flex-1 md:mx-16 ">
            <h3 className="text-lg md:text-xl font-semibold">Address</h3>
            <p className="text-sm md:text-base text-center font-semibold text-white">xxxxxxxxxxxxxxxxxxxxxx</p>
            
            <h3 className="text-lg md:text-xl font-semibold mt-4">Contact</h3>
            <p className="text-sm md:text-base font-semibold text-white">0572 050 747</p>
            <p className="text-xs md:text-sm font-semibold text-white">email:xxxxxxxxxxxxxxxxx</p>
            
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 bg-blue-600 hover:bg-blue-700 transition-colors rounded-full p-2 text-white"
              aria-label="Facebook"
            >
              <Facebook className="w-6 h-6" />
            </a>
          </div>

          {/* Pages Section */}
          <div className="flex flex-col items-center md:items-start md:flex-1 space-y-3">
            <h3 className="text-lg md:text-xl font-semibold mb-2">Pages</h3>
            <nav className="flex flex-col items-center md:items-start space-y-2 text-white">
              <a href="/home" className="text-sm md:text-base hover:underline transition-all">
                Home
              </a>
              <a href="/services" className="text-sm md:text-base hover:underline transition-all">
                Services
              </a>
              <a href="/appointments" className="text-sm md:text-base hover:underline transition-all">
                Appointments
              </a>
              <a href="/announcements" className="text-sm md:text-base hover:underline transition-all">
                Announcements
              </a>
              <a href="/resources" className="text-sm md:text-base hover:underline transition-all">
                Resources
              </a>
              <a href="/contact" className="text-sm md:text-base hover:underline transition-all">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}