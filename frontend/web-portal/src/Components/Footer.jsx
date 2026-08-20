import React from 'react';
import { Facebook } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function VetFooter() {
  const { t } = useTranslation();

  const navItems = [
    { key: 'home', path: '/home' },
    { key: 'services', path: '/services' },
    { key: 'appointments', path: '/appointments' },
    { key: 'announcements', path: '/announcements' },
    { key: 'resources', path: '/resources' },
    { key: 'contact', path: '/contact' },
  ];

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
            <h2 className="text-2xl md:text-3xl font-bold">{t('footer.title')}</h2>
            <p className="text-sm md:text-base text-center md:text-left max-w-xs text-[#283030]">
              {t('footer.description')}
            </p>
          </div>

          {/* Contact Section */}
          <div className="flex flex-col items-center md:flex-1 md:mx-16 ">
            <h3 className="text-lg md:text-xl font-semibold">{t('footer.addressTitle')}</h3>
            <p className="text-sm md:text-base text-center font-semibold text-white">{t('footer.address')}</p>
            
            <h3 className="text-lg md:text-xl font-semibold mt-4">{t('footer.contactTitle')}</h3>
            <p className="text-sm md:text-base font-semibold text-white">0771234567</p>
            <p className="text-xs md:text-sm font-semibold text-white">Email: info@haldummullavet.gov.lk</p>
            
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
            <h3 className="text-lg md:text-xl font-semibold mb-2">{t('footer.pagesTitle')}</h3>
            <nav className="flex flex-col items-center md:items-start space-y-2 text-white">
              {navItems.map((item) => (
                <a key={item.key} href={item.path} className="text-sm md:text-base hover:underline transition-all">
                  {t(`nav.${item.key}`)}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}