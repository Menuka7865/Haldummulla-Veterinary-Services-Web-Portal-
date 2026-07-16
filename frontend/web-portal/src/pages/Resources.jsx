import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import HeroSection from '../components/Resources/HeroSection';
import FeaturedResources from '../components/Resources/FeaturedResources';
import ResourceCategories from '../components/Resources/ResourceCategories';
import LatestArticles from '../components/Resources/LatestArticles';
import VideoSection from '../components/Resources/VideoSection';
import DownloadSection from '../components/Resources/DownloadSection';

const fallbackData = {
  featured: [
    { id: 1, title: 'Dairy Farming Best Practices', description: 'Learn proper feeding, housing, and management techniques to improve milk production and animal welfare.', buttonLabel: 'Read Guide', icon: '🐄' },
    { id: 2, title: 'Vaccination Schedules', description: 'View recommended vaccination schedules for cattle, goats, poultry, and pets.', buttonLabel: 'View Schedule', icon: '💉' },
    { id: 3, title: 'Common Animal Diseases', description: 'Identify symptoms early and learn preventive measures to protect livestock from common diseases.', buttonLabel: 'Learn More', icon: '🦠' },
  ],
  categories: [
    { id: 1, title: 'Dairy Farming', color: '#e6f4f1', iconColor: '#0d9488', items: ['Feeding Management', 'Milk Production Tips', 'Calf Rearing', 'Farm Hygiene'] },
    { id: 2, title: 'Livestock Management', color: '#fef9ee', iconColor: '#d97706', items: ['Cattle Care', 'Goat Farming', 'Poultry Management', 'Animal Welfare'] },
    { id: 3, title: 'Vaccination & Prevention', color: '#eef2ff', iconColor: '#6366f1', items: ['Vaccination Programs', 'Deworming Guidelines', 'Disease Prevention', 'Biosecurity Measures'] },
    { id: 4, title: 'Animal Health', color: '#fff0f0', iconColor: '#e11d48', items: ['Common Diseases', 'First Aid Tips', 'Emergency Signs', 'Treatment Advice'] },
    { id: 5, title: 'Farm Management', color: '#f0fdf4', iconColor: '#16a34a', items: ['Record Keeping', 'Breeding Practices', 'Nutrition Planning', 'Sustainable Farming'] },
    { id: 6, title: 'Government Programs', color: '#eff6ff', iconColor: '#2563eb', items: ['Livestock Development Programs', 'Farmer Assistance Schemes', 'Training Workshops', 'Awareness Campaigns'] },
  ],
  articles: [
    { id: 1, title: 'How to Prevent Foot and Mouth Disease in Cattle', excerpt: 'Learn practical steps to reduce the risk of disease outbreaks on your farm.', image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=300&h=200&fit=crop' },
    { id: 2, title: 'Essential Nutrition for Dairy Cows', excerpt: 'A balanced diet is key to maintaining healthy and productive livestock.', image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=300&h=200&fit=crop' },
    { id: 3, title: 'Preparing Your Farm for the Rainy Season', excerpt: 'Protect animals and maintain healthy farm conditions during wet weather.', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&h=200&fit=crop' },
  ],
  videos: [
    { id: 1, title: 'Proper Cattle Vaccination Techniques', duration: '5 min' },
    { id: 2, title: 'Dairy Farm Hygiene Practices', duration: '8 min' },
    { id: 3, title: 'Calf Feeding and Care', duration: '6 min' },
    { id: 4, title: 'Identifying Common Livestock Diseases', duration: '10 min' },
  ],
  downloads: [
    { id: 1, title: 'Vaccination Calendar 2026', file: '/downloads/vaccination-calendar.pdf' },
    { id: 2, title: 'Dairy Farm Record Sheet', file: '/downloads/dairy-farm-record.pdf' },
    { id: 3, title: 'Animal Health Checklist', file: '/downloads/animal-health-checklist.pdf' },
    { id: 4, title: 'Emergency Veterinary Contact Guide', file: '/downloads/emergency-contacts.pdf' },
  ],
};

function ResourcesPage() {
  const [featured] = useState(fallbackData.featured);
  const [categories] = useState(fallbackData.categories);
  const [articles] = useState(fallbackData.articles);
  const [videos] = useState(fallbackData.videos);
  const [downloads] = useState(fallbackData.downloads);

  return (
    <>
      <Navbar />
      <div className="font-sans text-gray-800">
        <HeroSection />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedResources items={featured} />
          <ResourceCategories categories={categories} />
          <LatestArticles articles={articles} />
          <VideoSection videos={videos} />
          <DownloadSection downloads={downloads} />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 bg-emerald-50 border border-emerald-100 rounded-xl px-6 sm:px-10 py-7 sm:py-8 my-10">
            <div className="flex gap-4 items-center">
              <span className="text-3xl sm:text-4xl">📅</span>
              <div>
                <h3 className="m-0 text-emerald-800 font-semibold text-base sm:text-lg">
                  Need Professional Assistance?
                </h3>
                <p className="mt-1.5 text-gray-600 text-sm">
                  If your animal requires treatment or expert consultation,
                  book an appointment with our veterinary team.
                </p>
              </div>
            </div>
            <button className="w-full sm:w-auto bg-teal-600 text-white border-none py-3.5 px-7 rounded-lg text-sm sm:text-[15px] cursor-pointer hover:bg-teal-700 transition-colors whitespace-nowrap">
              Book Appointment →
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ResourcesPage;