import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';
import HeroSection from '../Components/Resources/HeroSection';
import FeaturedResources from '../Components/Resources/FeaturedResources';
import ResourceCategories from '../Components/Resources/ResourceCategories';
import LatestArticles from '../Components/Resources/LatestArticles';
import VideoSection from '../Components/Resources/VideoSection';
import DownloadSection from '../Components/Resources/DownloadSection';
import { Loader2, AlertCircle } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api/resources';

const staticCategories = [
  { id: 1, title: 'Dairy Farming', color: '#e6f4f1', iconColor: '#0d9488', items: ['Feeding Management', 'Milk Production Tips', 'Calf Rearing', 'Farm Hygiene'] },
  { id: 2, title: 'Livestock Management', color: '#fef9ee', iconColor: '#d97706', items: ['Cattle Care', 'Goat Farming', 'Poultry Management', 'Animal Welfare'] },
  { id: 3, title: 'Vaccination & Prevention', color: '#eef2ff', iconColor: '#6366f1', items: ['Vaccination Programs', 'Deworming Guidelines', 'Disease Prevention', 'Biosecurity Measures'] },
  { id: 4, title: 'Animal Health', color: '#fff0f0', iconColor: '#e11d48', items: ['Common Diseases', 'First Aid Tips', 'Emergency Signs', 'Treatment Advice'] },
  { id: 5, title: 'Farm Management', color: '#f0fdf4', iconColor: '#16a34a', items: ['Record Keeping', 'Breeding Practices', 'Nutrition Planning', 'Sustainable Farming'] },
  { id: 6, title: 'Government Programs', color: '#eff6ff', iconColor: '#2563eb', items: ['Livestock Development Programs', 'Farmer Assistance Schemes', 'Training Workshops', 'Awareness Campaigns'] },
];

function ResourcesPage() {
  const [featured, setFeatured] = useState([]);
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [downloads, setDownloads] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAllResources = async () => {
      setLoading(true);
      try {
        const [resFeatured, resArticles, resVideos, resDownloads] = await Promise.all([
          fetch(`${API_BASE}?section=featured&status=Active`),
          fetch(`${API_BASE}?section=article&status=Active`),
          fetch(`${API_BASE}?section=video&status=Active`),
          fetch(`${API_BASE}?section=download&status=Active`),
        ]);

        if (!resFeatured.ok || !resArticles.ok || !resVideos.ok || !resDownloads.ok) {
          throw new Error('Failed to fetch resources');
        }

        const [dataFeatured, dataArticles, dataVideos, dataDownloads] = await Promise.all([
          resFeatured.json(),
          resArticles.json(),
          resVideos.json(),
          resDownloads.json(),
        ]);

        setFeatured(dataFeatured);
        setArticles(dataArticles);
        setVideos(dataVideos);
        setDownloads(dataDownloads);
      } catch (err) {
        console.error(err);
        setError('Unable to load resources from the server.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllResources();
  }, []);

  return (
    <>
      <Navbar />
      <div className="font-sans text-gray-800 bg-white">
        <HeroSection />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          
          {loading && (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin mb-3 text-teal-500" />
              <p className="text-sm">Loading resources...</p>
            </div>
          )}

          {!loading && error && (
            <div className="flex items-center justify-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm max-w-xl mx-auto mt-10">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!loading && !error && (
            <>
              {featured.length > 0 && <FeaturedResources items={featured} />}
              
              <ResourceCategories categories={staticCategories} />
              
              {articles.length > 0 && <LatestArticles articles={articles} />}
              {videos.length > 0 && <VideoSection videos={videos} />}
              {downloads.length > 0 && <DownloadSection downloads={downloads} />}
            </>
          )}

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
            <a href="/appointments" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-teal-600 text-white border-none py-3.5 px-7 rounded-lg text-sm sm:text-[15px] cursor-pointer hover:bg-teal-700 transition-colors whitespace-nowrap">
                Book Appointment →
              </button>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ResourcesPage;