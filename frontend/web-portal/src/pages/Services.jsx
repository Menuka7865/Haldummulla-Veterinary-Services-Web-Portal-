import React, { useState } from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import { X, CheckCircle, ArrowRight, PhoneCall, ShieldCheck, MapPin, Calendar, BookOpen } from "lucide-react";

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);

  const features = [
    {
      id: 1,
      icon: "🩺",
      category: "Clinical Care",
      title: "General Health Checkups & Clinical Care",
      description:
        "Comprehensive physical examinations, diagnostic checks, and clinical treatment for livestock and pets.",
      fullOverview:
        "The Haldummulla Government Veterinary Office provides comprehensive clinical checkups and medical treatment for all livestock (cattle, buffaloes, goats, poultry) and domestic pets. Under the leadership of Government Veterinary Surgeon Dr. S.T.H.K. Senanayake, our clinic offers early disease diagnosis, prescription of government-approved veterinary medicines, and continuous health tracking.",
      keyPoints: [
        "Routine physical health examinations & body condition scoring",
        "Diagnostic evaluation & acute clinical treatment",
        "Government-approved veterinary prescriptions & wound care",
        "Individual animal medical history & health record maintenance"
      ],
      targetAudience: "Local dairy farmers, livestock breeders, and pet owners in Haldummulla.",
      location: "Government Veterinary Office Clinic & On-Site",
      actionText: "Book Health Checkup",
      actionLink: "/appointments"
    },
    {
      id: 2,
      icon: "💉",
      category: "Preventive Healthcare",
      title: "Vaccination Programs & Outbreak Control",
      description:
        "Routine immunization campaigns and customized vaccination schedules to prevent spreadable livestock diseases.",
      fullOverview:
        "Immunization is vital for safeguarding livestock health and securing dairy milk production in Haldummulla. Our veterinary office conducts scheduled mass vaccination drives for major contagious diseases, including Foot-and-Mouth Disease (FMD), Haemorrhagic Septicaemia (HS), Blackquarter, and Anti-Rabies.",
      keyPoints: [
        "Routine Foot-and-Mouth Disease (FMD) & HS immunization drives",
        "Anti-Rabies vaccination for pets & community animals",
        "Mobile field vaccination teams dispatched to rural dairy farms",
        "Real-time vaccination announcements & digital reminders"
      ],
      targetAudience: "Dairy cattle owners, livestock farmers, and local pet owners.",
      location: "Field Vaccination Campaigns & Vet Office",
      actionText: "View Vaccination Updates",
      actionLink: "/announcements"
    },
    {
      id: 3,
      icon: "🚨",
      category: "Emergency Response",
      title: "Emergency Care & Field Visit Requests",
      description:
        "Urgent medical response and immediate on-farm veterinary treatment for critical conditions and calving emergencies.",
      fullOverview:
        "When animals are critically ill or cannot be transported to the office, farmers can submit emergency field visit requests through our web portal or hotline (0771234567). Veterinary officers are dispatched directly to farms for emergency calving (dystocia), acute trauma, severe bloat, and acute systemic infections.",
      keyPoints: [
        "Direct Emergency Hotline: 0771234567",
        "On-farm emergency surgical and obstetrical assistance",
        "Online Field Visit Request system with real-time status tracking",
        "Priority dispatch of government veterinary surgeons"
      ],
      targetAudience: "Rural dairy farmers and livestock owners requiring urgent assistance.",
      location: "Direct On-Farm Visit (Haldummulla Region)",
      actionText: "Request Emergency Visit",
      actionLink: "/appointments"
    },
    {
      id: 4,
      icon: "🐮",
      category: "Livestock Development",
      title: "Dairy Farming & Breeding Advisory (AI)",
      description:
        "Artificial insemination (AI) services, breed enhancement, and expert advisory to maximize milk production.",
      fullOverview:
        "Tailored specifically to empower Haldummulla's dairy farming community, this service provides high-grade Artificial Insemination (AI) using top genetic breeds (Friesian, Jersey, Sahiwal). We provide pregnancy diagnosis (PD), fertility management, mastitis control, and nutrition advice to enhance farm productivity.",
      keyPoints: [
        "Artificial Insemination (AI) with superior genetic strains",
        "Pregnancy Diagnosis (PD) & reproductive cycle tracking",
        "Clean milk production & mastitis prevention protocols",
        "Fodder, silage management, and balanced feed guidance"
      ],
      targetAudience: "Dairy cattle and goat farmers looking to increase milk yield and herd quality.",
      location: "Vet Office & Field Farm Visits",
      actionText: "Book AI / Breeding Service",
      actionLink: "/appointments"
    },
    {
      id: 5,
      icon: "💬",
      category: "Tele-Veterinary Support",
      title: "Online Consultations & Advisory",
      description:
        "Get professional veterinary advice and guidance from the comfort of your home through digital consultation.",
      fullOverview:
        "Farmers can connect with Haldummulla veterinary staff for advisory support regarding non-emergency conditions, animal husbandry, seasonal health care, and deworming protocols. This reduces travel burdens for rural farmers while maintaining continuous expert guidance.",
      keyPoints: [
        "Direct inquiry submission to Haldummulla Vet Office",
        "Remote advice on nutrition, deworming, and minor symptoms",
        "Guidance on government agricultural subsidies & schemes",
        "Fast response times from qualified veterinary staff"
      ],
      targetAudience: "All registered farmers and animal owners in the Haldummulla area.",
      location: "Online / Digital Portal",
      actionText: "Contact Vet Office",
      actionLink: "/contact"
    },
    {
      id: 6,
      icon: "📚",
      category: "Knowledge Hub",
      title: "Educational Resources & Extension Services",
      description:
        "Informative guides, husbandry tips, and preventative care articles to support the local farming community.",
      fullOverview:
        "Developed in collaboration with the Department of Computing & Information Systems (Sabaragamuwa University) and the Government Veterinary Office, this module provides free educational materials. Farmers can access guides on disease prevention, calf management, clean milk production, and sustainable farming practices.",
      keyPoints: [
        "Free downloadable guides, articles, and husbandry manuals",
        "Categorized resources for Cattle, Goats, Poultry, and Pets",
        "Disease prevention protocols and farm biosecurity tips",
        "Updates on community workshops and agricultural extension"
      ],
      targetAudience: "Dairy farmers, livestock managers, and agricultural students.",
      location: "Web Portal Resource Library",
      actionText: "Explore Educational Hub",
      actionLink: "/resources"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Header Banner */}
      <div className="bg-gradient-to-b from-emerald-200 via-teal-50 to-gray-50 py-10 px-6 sm:px-10 border-b border-teal-100">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-sm font-semibold text-teal-800 tracking-wider uppercase mb-1">
            Government Veterinary Office — Haldummulla
          </h1>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
            Our Services & Programs
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl">
            Providing comprehensive animal healthcare, emergency field visits, vaccination drives, and livestock advisory services to support our local farming community.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              onClick={() => setSelectedService(feature)}
              className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-teal-300 transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-[#C6F0EB] w-14 h-14 flex items-center justify-center rounded-2xl text-2xl group-hover:scale-110 transition-transform duration-200">
                    {feature.icon}
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-teal-50 text-teal-700 rounded-full border border-teal-100">
                    {feature.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {feature.description}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-teal-600 font-medium text-sm">
                <span>Click for Full Details</span>
                <span className="bg-teal-50 p-2 rounded-full group-hover:bg-teal-600 group-hover:text-white transition-colors duration-200">
                  <ArrowRight size={16} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Service Details Modal Popup */}
      {selectedService && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-all animate-in fade-in"
          onClick={() => setSelectedService(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-teal-100 p-6 sm:p-8 relative transition-all transform scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
              aria-label="Close details"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="flex items-start space-x-4 mb-6 pr-8">
              <div className="bg-[#C6F0EB] w-16 h-16 shrink-0 flex items-center justify-center rounded-2xl text-3xl shadow-inner">
                {selectedService.icon}
              </div>
              <div>
                <span className="inline-block text-xs font-semibold px-3 py-1 bg-teal-50 text-teal-700 rounded-full border border-teal-200 mb-1">
                  {selectedService.category}
                </span>
                <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                  {selectedService.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <ShieldCheck size={14} className="text-teal-600" /> Government Veterinary Office, Haldummulla
                </p>
              </div>
            </div>

            {/* Detailed Content */}
            <div className="space-y-6 text-gray-700">
              <div>
                <h4 className="text-sm font-bold text-teal-800 uppercase tracking-wider mb-2">
                  Service Overview
                </h4>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {selectedService.fullOverview}
                </p>
              </div>

              {/* Key Features List */}
              <div>
                <h4 className="text-sm font-bold text-teal-800 uppercase tracking-wider mb-3">
                  Key Scope & Services Included
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {selectedService.keyPoints.map((point, index) => (
                    <div key={index} className="flex items-start space-x-3 bg-white p-3 rounded-lg border border-gray-100 shadow-2xs">
                      <CheckCircle size={18} className="text-teal-600 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 font-medium">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Beneficiaries & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100">
                  <div className="flex items-center space-x-2 text-emerald-800 font-semibold text-xs uppercase mb-1">
                    <BookOpen size={14} />
                    <span>Target Beneficiaries</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700">
                    {selectedService.targetAudience}
                  </p>
                </div>

                <div className="bg-teal-50/60 p-4 rounded-xl border border-teal-100">
                  <div className="flex items-center space-x-2 text-teal-800 font-semibold text-xs uppercase mb-1">
                    <MapPin size={14} />
                    <span>Service Location</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700">
                    {selectedService.location}
                  </p>
                </div>
              </div>

              {/* Contact Notice */}
              <div className="flex items-center justify-between bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-amber-900 text-xs sm:text-sm">
                <div className="flex items-center space-x-2">
                  <PhoneCall size={16} className="text-amber-700 shrink-0" />
                  <span>Emergency Hotline: <strong>0771234567</strong> (Dr. S.T.H.K. Senanayake)</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-8 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                Close
              </button>
              <a 
                href={selectedService.actionLink}
                className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors shadow-md flex items-center justify-center space-x-2"
              >
                <span>{selectedService.actionText}</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Services;
