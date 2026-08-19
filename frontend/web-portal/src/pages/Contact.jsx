import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Navbar from '../Components/Navbar.jsx';
import Footer from '../Components/Footer.jsx';

const API_BASE = 'http://localhost:5000/api';

export default function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // 1. Save inquiry to MongoDB database
      const response = await fetch(`${API_BASE}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save inquiry');
      }

      // 2. Send email via EmailJS
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError('Something went wrong. Your message was saved but email may not have been sent. Please try again or contact us by phone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  const inputCls = (field) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
      formErrors[field]
        ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
        : 'border-gray-200 focus:border-teal-500 focus:ring-teal-100'
    }`;

  return (
    <>
      <Navbar />
      <div className="bg-linear-to-b from-emerald-200 via-gray-50 to-slate-50 min-h-screen">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Contact Us
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Get in touch with the Government Veterinary Office of Haldummulla for appointments, field visit requests, animal husbandry support, or any inquiries.
            </p>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-start"
          >
            {/* Left Column: Contact Info & Map */}
            <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">Office Information</h3>
                <div className="space-y-5">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-6 w-6 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700">Address</h4>
                      <p className="text-sm text-gray-600 mt-0.5">
                        Government Veterinary Office,<br />
                        Colombo–Ratnapura–Wellawaya–Batticaloa Road (A4),<br />
                        Haldummulla, Badulla District, Sri Lanka.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-6 w-6 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700">Phone & Hotline</h4>
                      <p className="text-sm text-gray-700 font-medium mt-0.5">
                        Emergency Hotline: <a href="tel:0771234567" className="text-teal-600 hover:underline font-semibold">0771234567</a>
                      </p>
                      <p className="text-sm text-gray-600">
                        Government Vet Surgeon: <span className="text-gray-800 font-medium">Dr. S.T.H.K. Senanayake</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Office: <a href="tel:0572050747" className="hover:text-teal-600 transition-colors">057 2050 747</a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="h-6 w-6 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700">Email</h4>
                      <p className="text-sm text-gray-600 mt-0.5">
                        <a href="mailto:info@haldummullavet.gov.lk" className="hover:text-teal-600 transition-colors">
                          info@haldummullavet.gov.lk
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Clock className="h-6 w-6 text-teal-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700">Working Hours</h4>
                      <p className="text-sm text-gray-600 mt-0.5">Monday – Friday: 8:00 AM – 5:00 PM</p>
                      <p className="text-sm text-gray-600">Saturday: 8:00 AM – 1:00 PM</p>
                      <p className="text-sm text-gray-500 italic mt-0.5">Sunday & Public Holidays: Emergency Service Only</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Card */}
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <h3 className="text-lg font-bold text-gray-900 mb-3 px-2">Location Map</h3>
                <div className="relative w-full h-[320px] rounded-xl overflow-hidden shadow-inner">
                  <iframe
                    title="Government Veterinary Office Haldummulla Location Map"
                    src="https://maps.google.com/maps?q=Government%20Veterinary%20Office,%20Haldummulla&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  ></iframe>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div variants={itemVariants} className="lg:col-span-7">
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden">
                <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">Send us a Message</h3>

                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start space-x-3 text-emerald-800"
                    >
                      <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">Thank you for contacting us!</h4>
                        <p className="text-sm mt-0.5">Your message has been received. Our team will review and respond to you as soon as possible.</p>
                      </div>
                    </motion.div>
                  )}
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 text-red-800"
                    >
                      <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                      <p className="text-sm">{submitError}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* The form ref is used by EmailJS to read field values */}
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-1">
                    <label htmlFor="name" className="text-sm font-semibold text-gray-700">Full Name</label>
                    <input
                      type="text" id="name" name="name"
                      value={formData.name} onChange={handleInputChange}
                      className={inputCls('name')} placeholder="e.g. Sunil Perera"
                    />
                    {formErrors.name && <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 gap-1">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</label>
                    <input
                      type="email" id="email" name="email"
                      value={formData.email} onChange={handleInputChange}
                      className={inputCls('email')} placeholder="e.g. sunil@example.com"
                    />
                    {formErrors.email && <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>}
                  </div>

                  <div className="grid grid-cols-1 gap-1">
                    <label htmlFor="subject" className="text-sm font-semibold text-gray-700">Subject</label>
                    <input
                      type="text" id="subject" name="subject"
                      value={formData.subject} onChange={handleInputChange}
                      className={inputCls('subject')} placeholder="e.g. Inquiry about dairy cattle vaccination schedule"
                    />
                    {formErrors.subject && <p className="text-xs text-red-500 mt-1">{formErrors.subject}</p>}
                  </div>

                  <div className="grid grid-cols-1 gap-1">
                    <label htmlFor="message" className="text-sm font-semibold text-gray-700">Message</label>
                    <textarea
                      id="message" name="message" rows="5"
                      value={formData.message} onChange={handleInputChange}
                      className={`${inputCls('message')} resize-none`}
                      placeholder="Type your message here..."
                    ></textarea>
                    {formErrors.message && <p className="text-xs text-red-500 mt-1">{formErrors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer mt-4"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
