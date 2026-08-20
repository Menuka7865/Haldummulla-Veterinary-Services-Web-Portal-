import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, LogOut, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logoSteth from '../images/logoSteth.png';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  
  const dropdownRef = useRef(null);
  const langDropdownRef = useRef(null);

  // Read user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      if (stored) setUser(JSON.parse(stored));
    } catch {
      setUser(null);
    }
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target)) {
        setLangDropdownOpen(false);
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

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangDropdownOpen(false);
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  // Define nav items mapping to translation keys
  const navItems = [
    { key: 'home', path: '/home' },
    { key: 'services', path: '/services' },
    { key: 'announcements', path: '/announcements' },
    { key: 'resources', path: '/resources' },
    { key: 'appointments', path: '/appointments' },
    { key: 'contact', path: '/contact' },
  ];

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'si', label: 'සිංහල' },
    { code: 'ta', label: 'தமிழ்' },
  ];

  // Get initials from name (first letter only)
  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : '?');

  return (
    <nav className="bg-white shadow-sm relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <a href="/" className="flex items-center space-x-2 group shrink-0">
            <img
              src={logoSteth}
              alt="Haldummulla Vet Logo"
              className="h-8 w-8 transition-transform group-hover:scale-105"
            />
            <span className="text-lg md:text-xl font-semibold text-teal-600 group-hover:text-teal-700 transition-colors hidden sm:block">
              {t('nav.title')}
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 ml-4">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.path}
                className="text-gray-700 hover:text-teal-600 transition-colors duration-200 text-sm font-medium whitespace-nowrap"
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </div>

          {/* Desktop Right Side — Language + Auth */}
          <div className="hidden lg:flex items-center space-x-4">
            
            {/* Language Switcher */}
            <div className="relative" ref={langDropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 text-gray-600 hover:text-teal-600 px-2 py-1.5 rounded-md transition-colors text-sm font-medium"
                title="Change language"
              >
                <Globe size={18} />
                <span className="uppercase">{i18n.language?.substring(0, 2) || 'en'}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  {languages.map((lng) => (
                    <button
                      key={lng.code}
                      onClick={() => changeLanguage(lng.code)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        i18n.language?.startsWith(lng.code) 
                          ? 'bg-teal-50 text-teal-700 font-semibold' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {lng.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="h-5 w-px bg-gray-300 mx-1"></div>

            {user ? (
              /* Logged-in: Avatar + Dropdown */
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
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
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
                      <span>{t('nav.logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Logged-out: Login + Register */
              <div className="flex items-center space-x-3">
                <a
                  href="/login"
                  className="text-gray-700 hover:text-teal-600 transition-colors duration-200 text-sm font-medium"
                >
                  {t('nav.login')}
                </a>
                <a
                  href="/register"
                  className="bg-teal-600 text-white px-5 py-2 rounded-md hover:bg-teal-700 transition-colors duration-200 text-sm font-medium"
                >
                  {t('nav.register')}
                </a>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-teal-600 hover:bg-gray-100 transition-colors duration-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-3 bg-white border-t">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.path}
              className="block text-gray-700 hover:text-teal-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors duration-200 text-sm font-medium"
              onClick={() => setIsOpen(false)}
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}

          {/* Mobile Language Switcher */}
          <div className="pt-3 border-t">
            <p className="px-3 text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Language</p>
            <div className="flex gap-2 px-2">
              {languages.map((lng) => (
                <button
                  key={lng.code}
                  onClick={() => changeLanguage(lng.code)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    i18n.language?.startsWith(lng.code) 
                      ? 'bg-teal-600 text-white font-medium' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {lng.label}
                </button>
              ))}
            </div>
          </div>

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
                  <span>{t('nav.logout')}</span>
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
                  {t('nav.login')}
                </a>
                <a
                  href="/register"
                  className="block w-full text-center bg-teal-600 text-white px-3 py-2 rounded-md hover:bg-teal-700 transition-colors duration-200 text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {t('nav.register')}
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}