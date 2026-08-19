import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";
import {
  X, CheckCircle, ArrowRight, PhoneCall, ShieldCheck,
  MapPin, BookOpen, Loader2, AlertCircle, Stethoscope,
} from "lucide-react";

const API_BASE = "http://localhost:5000/api/services";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [selectedService, setSelectedService] = useState(null);

  // Fetch active services from backend on mount
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setFetchError("");
      try {
        const res = await fetch(`${API_BASE}?status=Active`);
        if (!res.ok) throw new Error(`Server responded with status ${res.status}`);
        const data = await res.json();
        setServices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch services:", err.message);
        setFetchError("Unable to load services. Please check your connection or try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

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
            Our Services &amp; Programs
          </h2>
          <p className="text-base lg:text-lg text-gray-600 max-w-3xl">
            Providing comprehensive animal healthcare, emergency field visits, vaccination drives, and livestock advisory services to support our local farming community.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin mb-3 text-teal-500" />
            <p className="text-sm">Loading services…</p>
          </div>
        )}

        {/* Error State */}
        {!loading && fetchError && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl text-sm max-w-xl mx-auto">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{fetchError}</span>
          </div>
        )}

        {/* Services Grid */}
        {!loading && !fetchError && (
          <>
            {services.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Stethoscope className="w-12 h-12 mb-4 text-teal-200" strokeWidth={1.5} />
                <p className="text-base font-medium text-gray-500">No services available</p>
                <p className="text-sm mt-1 text-gray-400">
                  Services will appear here once they are added by the admin.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <div
                    key={service._id}
                    onClick={() => setSelectedService(service)}
                    className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 hover:border-teal-300 transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="bg-[#C6F0EB] w-14 h-14 flex items-center justify-center rounded-2xl text-2xl group-hover:scale-110 transition-transform duration-200">
                          {service.icon || "🩺"}
                        </div>
                        <span className="text-xs font-semibold px-3 py-1 bg-teal-50 text-teal-700 rounded-full border border-teal-100">
                          {service.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-700 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        {service.description}
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
            )}
          </>
        )}
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
                {selectedService.icon || "🩺"}
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

              {/* Full Overview */}
              {selectedService.fullOverview && (
                <div>
                  <h4 className="text-sm font-bold text-teal-800 uppercase tracking-wider mb-2">
                    Service Overview
                  </h4>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {selectedService.fullOverview}
                  </p>
                </div>
              )}

              {/* Key Points */}
              {Array.isArray(selectedService.keyPoints) && selectedService.keyPoints.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-teal-800 uppercase tracking-wider mb-3">
                    Key Scope &amp; Services Included
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {selectedService.keyPoints.map((point, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 bg-white p-3 rounded-lg border border-gray-100 shadow-2xs"
                      >
                        <CheckCircle size={18} className="text-teal-600 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 font-medium">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Target Beneficiaries & Location */}
              {(selectedService.targetAudience || selectedService.location) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {selectedService.targetAudience && (
                    <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100">
                      <div className="flex items-center space-x-2 text-emerald-800 font-semibold text-xs uppercase mb-1">
                        <BookOpen size={14} />
                        <span>Target Beneficiaries</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700">
                        {selectedService.targetAudience}
                      </p>
                    </div>
                  )}
                  {selectedService.location && (
                    <div className="bg-teal-50/60 p-4 rounded-xl border border-teal-100">
                      <div className="flex items-center space-x-2 text-teal-800 font-semibold text-xs uppercase mb-1">
                        <MapPin size={14} />
                        <span>Service Location</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700">
                        {selectedService.location}
                      </p>
                    </div>
                  )}
                </div>
              )}

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
              {selectedService.actionLink && (
                <a
                  href={selectedService.actionLink}
                  className="w-full sm:w-auto px-6 py-2.5 text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors shadow-md flex items-center justify-center space-x-2"
                >
                  <span>{selectedService.actionText || "Learn More"}</span>
                  <ArrowRight size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Services;
