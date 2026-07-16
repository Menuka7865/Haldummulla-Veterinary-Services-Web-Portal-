import { useState } from 'react';
import HeroSection from '../components/Resources/HeroSection';
import FeaturedResources from '../components/Resources/FeaturedResources';
import ResourceCategories from '../components/Resources/ResourceCategories';
import LatestArticles from '../components/Resources/LatestArticles';
import VideoSection from '../components/Resources/VideoSection';
import DownloadSection from '../components/Resources/DownloadSection';


const fallbackData = {
  featured: [
    {
      id: 1,
      title: 'Dairy Farming Best Practices',
      description:
        'Learn proper feeding, housing, and management techniques to improve milk production and animal welfare.',
      buttonLabel: 'Read Guide',
      icon: '🐄',
    },
    {
      id: 2,
      title: 'Vaccination Schedules',
      description:
        'View recommended vaccination schedules for cattle, goats, poultry, and pets.',
      buttonLabel: 'View Schedule',
      icon: '💉',
    },
    {
      id: 3,
      title: 'Common Animal Diseases',
      description:
        'Identify symptoms early and learn preventive measures to protect livestock from common diseases.',
      buttonLabel: 'Learn More',
      icon: '🦠',
    },
  ],

  categories: [
    {
      id: 1,
      title: 'Dairy Farming',
      color: '#e6f4f1',
      iconColor: '#0d9488',
      items: [
        'Feeding Management',
        'Milk Production Tips',
        'Calf Rearing',
        'Farm Hygiene',
      ],
    },
    {
      id: 2,
      title: 'Livestock Management',
      color: '#fef9ee',
      iconColor: '#d97706',
      items: [
        'Cattle Care',
        'Goat Farming',
        'Poultry Management',
        'Animal Welfare',
      ],
    },
    {
      id: 3,
      title: 'Vaccination & Prevention',
      color: '#eef2ff',
      iconColor: '#6366f1',
      items: [
        'Vaccination Programs',
        'Deworming Guidelines',
        'Disease Prevention',
        'Biosecurity Measures',
      ],
    },
    {
      id: 4,
      title: 'Animal Health',
      color: '#fff0f0',
      iconColor: '#e11d48',
      items: [
        'Common Diseases',
        'First Aid Tips',
        'Emergency Signs',
        'Treatment Advice',
      ],
    },
    {
      id: 5,
      title: 'Farm Management',
      color: '#f0fdf4',
      iconColor: '#16a34a',
      items: [
        'Record Keeping',
        'Breeding Practices',
        'Nutrition Planning',
        'Sustainable Farming',
      ],
    },
    {
      id: 6,
      title: 'Government Programs',
      color: '#eff6ff',
      iconColor: '#2563eb',
      items: [
        'Livestock Development Programs',
        'Farmer Assistance Schemes',
        'Training Workshops',
        'Awareness Campaigns',
      ],
    },
  ],

  articles: [
    {
      id: 1,
      title: 'How to Prevent Foot and Mouth Disease in Cattle',
      excerpt:
        'Learn practical steps to reduce the risk of disease outbreaks on your farm.',
      image:
        'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=300&h=200&fit=crop',
    },
    {
      id: 2,
      title: 'Essential Nutrition for Dairy Cows',
      excerpt:
        'A balanced diet is key to maintaining healthy and productive livestock.',
      image:
        'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=300&h=200&fit=crop',
    },
    {
      id: 3,
      title: 'Preparing Your Farm for the Rainy Season',
      excerpt:
        'Protect animals and maintain healthy farm conditions during wet weather.',
      image:
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&h=200&fit=crop',
    },
  ],

  videos: [
    {
      id: 1,
      title: 'Proper Cattle Vaccination Techniques',
      duration: '5 min',
    },
    {
      id: 2,
      title: 'Dairy Farm Hygiene Practices',
      duration: '8 min',
    },
    {
      id: 3,
      title: 'Calf Feeding and Care',
      duration: '6 min',
    },
    {
      id: 4,
      title: 'Identifying Common Livestock Diseases',
      duration: '10 min',
    },
  ],

  downloads: [
    {
      id: 1,
      title: 'Vaccination Calendar 2026',
      file: '/downloads/vaccination-calendar.pdf',
    },
    {
      id: 2,
      title: 'Dairy Farm Record Sheet',
      file: '/downloads/dairy-farm-record.pdf',
    },
    {
      id: 3,
      title: 'Animal Health Checklist',
      file: '/downloads/animal-health-checklist.pdf',
    },
    {
      id: 4,
      title: 'Emergency Veterinary Contact Guide',
      file: '/downloads/emergency-contacts.pdf',
    },
  ],
};


function ResourcesPage() {

  // Using only local fallback data (No backend connection)
  const [featured] = useState(fallbackData.featured);
  const [categories] = useState(fallbackData.categories);
  const [articles] = useState(fallbackData.articles);
  const [videos] = useState(fallbackData.videos);
  const [downloads] = useState(fallbackData.downloads);


  return (
    <div 
      style={{
        fontFamily: 'sans-serif',
        color: '#222'
      }}
    >

      <HeroSection />


      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 30px'
        }}
      >

        <FeaturedResources items={featured} />

        <ResourceCategories categories={categories} />

        <LatestArticles articles={articles} />

        <VideoSection videos={videos} />

        <DownloadSection downloads={downloads} />


        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#f0fdf4',
            border: '1px solid #d1fae5',
            borderRadius: '12px',
            padding: '30px 40px',
            margin: '40px 0'
          }}
        >

          <div
            style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center'
            }}
          >

            <span style={{ fontSize: '36px' }}>
              📅
            </span>


            <div>

              <h3
                style={{
                  margin: 0,
                  color: '#166534'
                }}
              >
                Need Professional Assistance?
              </h3>


              <p
                style={{
                  margin: '6px 0 0',
                  color: '#555',
                  fontSize: '14px'
                }}
              >
                If your animal requires treatment or expert consultation,
                book an appointment with our veterinary team.
              </p>

            </div>

          </div>


          <button
            style={{
              background: '#0d9488',
              color: '#fff',
              border: 'none',
              padding: '14px 28px',
              borderRadius: '8px',
              fontSize: '15px',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            Book Appointment →
          </button>


        </div>


      </div>


    </div>
  );
}


export default ResourcesPage;