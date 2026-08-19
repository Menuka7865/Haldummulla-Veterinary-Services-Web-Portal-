import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const API_BASE = 'http://localhost:5000/api';

const AppointmentForm = ({ onAddAppointment }) => {
  const [formData, setFormData] = useState({
    serviceType: '',
    animalType: '',
    farmerName: '',
    contactNumber: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  });

  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Validation Rules
  const validate = () => {
    const errors = {};
    if (!formData.farmerName.trim()) errors.farmerName = 'Your name is required.';
    if (!formData.serviceType) errors.serviceType = 'Service Type is required.';
    if (!formData.animalType) errors.animalType = 'Animal Type is required.';

    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid.';
    }

    const phoneRegex = /^\d{1,10}$/;
    if (!formData.contactNumber) {
      errors.contactNumber = 'Contact Number is required.';
    } else if (!phoneRegex.test(formData.contactNumber)) {
      errors.contactNumber = 'Contact Number must be up to 10 digits.';
    } else if (formData.contactNumber.length !== 10) {
      errors.contactNumber = 'Contact Number must be exactly 10 digits.';
    }

    if (!formData.preferredDate) errors.preferredDate = 'Please select a date.';
    if (!formData.preferredTime) errors.preferredTime = 'Please select a time.';
    if (formData.notes.length > 300) errors.notes = 'Notes cannot exceed 300 characters.';

    return errors;
  };

  const errors = validate();
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'contactNumber') {
      const numbersOnly = value.replace(/[^0-9]/g, '');
      if (numbersOnly.length <= 10) setFormData({ ...formData, [name]: numbersOnly });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // 1. Save appointment to MongoDB
      const response = await fetch(`${API_BASE}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          farmer: formData.farmerName,
          phone: formData.contactNumber,
          animal: formData.animalType,
          service: formData.serviceType,
          date: formData.preferredDate,
          time: formData.preferredTime,
          notes: formData.notes,
        }),
      });

      if (!response.ok) throw new Error('Failed to save appointment');
      const savedAppointment = await response.json();

      // 2. Send confirmation email via EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_APPOINTMENT_TEMPLATE_ID,
        {
          farmer_name: formData.farmerName,
          farmer_email: formData.email,
          service_type: formData.serviceType,
          animal_type: formData.animalType,
          contact_number: formData.contactNumber,
          preferred_date: formData.preferredDate,
          preferred_time: formData.preferredTime,
          notes: formData.notes || 'None',
        },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );

      // 3. Notify parent (for appointment history display)
      if (onAddAppointment) {
        onAddAppointment({
          id: savedAppointment._id,
          date: formData.preferredDate,
          time: formData.preferredTime,
          service: formData.serviceType,
          status: 'Pending',
        });
      }

      // Reset form
      setFormData({
        serviceType: '', animalType: '', farmerName: '',
        contactNumber: '', email: '', preferredDate: '',
        preferredTime: '', notes: '',
      });
      setTouched({});
      setSuccessMessage('Appointment booked successfully! A confirmation email has been sent.');
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (err) {
      console.error('Appointment error:', err);
      setErrorMessage('Something went wrong. Please try again or contact us by phone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  const fieldCls = (name) =>
    `w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-colors ${
      touched[name] && errors[name] ? 'border-red-500' : 'border-gray-200'
    }`;

  return (
    <div className="w-full max-w-4xl mx-auto -mt-10 relative z-10 px-4 md:px-0">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">New Appointment Details</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Farmer Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
              <input
                type="text" name="farmerName" value={formData.farmerName}
                onChange={handleChange} onBlur={handleBlur}
                placeholder="Enter your full name" className={fieldCls('farmerName')}
              />
              {touched.farmerName && errors.farmerName && (
                <p className="text-red-500 text-xs mt-1">{errors.farmerName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email" name="email" value={formData.email}
                onChange={handleChange} onBlur={handleBlur}
                placeholder="Enter your email" className={fieldCls('email')}
              />
              {touched.email && errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Service Type */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
              <select name="serviceType" value={formData.serviceType} onChange={handleChange} onBlur={handleBlur} className={fieldCls('serviceType')}>
                <option value="">Select a service</option>
                <option value="Vaccination">Vaccination</option>
                <option value="Artificial Insemination">Artificial Insemination</option>
                <option value="Animal Treatment">Animal Treatment</option>
                <option value="Emergency Visit">Emergency Visit</option>
                <option value="Deworming">Deworming</option>
                <option value="Pregnancy Check">Pregnancy Check</option>
                <option value="Other">Other</option>
              </select>
              {touched.serviceType && errors.serviceType && (
                <p className="text-red-500 text-xs mt-1">{errors.serviceType}</p>
              )}
            </div>

            {/* Animal Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Animal Type</label>
              <select name="animalType" value={formData.animalType} onChange={handleChange} onBlur={handleBlur} className={fieldCls('animalType')}>
                <option value="">Select animal type</option>
                <option value="Cow">Cow</option>
                <option value="Goat">Goat</option>
                <option value="Buffalo">Buffalo</option>
                <option value="Sheep">Sheep</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Poultry">Poultry</option>
                <option value="Other">Other</option>
              </select>
              {touched.animalType && errors.animalType && (
                <p className="text-red-500 text-xs mt-1">{errors.animalType}</p>
              )}
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
              <input
                type="text" name="contactNumber" value={formData.contactNumber}
                onChange={handleChange} onBlur={handleBlur}
                placeholder="Enter your phone number" className={fieldCls('contactNumber')}
              />
              {touched.contactNumber && errors.contactNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>
              )}
            </div>

            {/* Preferred Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
              <input
                type="date" name="preferredDate" value={formData.preferredDate}
                onChange={handleChange} onBlur={handleBlur} min={today}
                className={fieldCls('preferredDate')}
              />
              {touched.preferredDate && errors.preferredDate && (
                <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>
              )}
            </div>

            {/* Preferred Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
              <select name="preferredTime" value={formData.preferredTime} onChange={handleChange} onBlur={handleBlur} className={fieldCls('preferredTime')}>
                <option value="">Select a time slot</option>
                <option value="08:00 AM">08:00 AM</option>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="01:00 PM">01:00 PM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="03:00 PM">03:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
              </select>
              {touched.preferredTime && errors.preferredTime && (
                <p className="text-red-500 text-xs mt-1">{errors.preferredTime}</p>
              )}
            </div>

            {/* Additional Notes */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
              <textarea
                name="notes" value={formData.notes} onChange={handleChange} onBlur={handleBlur}
                placeholder="Any specific details or concerns..." rows="4"
                className={`${fieldCls('notes')} resize-none`}
              ></textarea>
              <div className="flex justify-between items-center mt-1">
                {touched.notes && errors.notes ? (
                  <p className="text-red-500 text-xs">{errors.notes}</p>
                ) : <span></span>}
                <p className="text-xs text-gray-400">{formData.notes.length}/300</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`w-full py-4 rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              isValid && !isSubmitting
                ? 'bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg'
                : 'bg-green-300 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Book Appointment'
            )}
          </button>

          {/* Success / Error Messages */}
          <AnimatePresence>
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-green-50 text-green-700 rounded-lg text-center font-medium mt-4 border border-green-100"
              >
                {successMessage}
              </motion.div>
            )}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-red-50 text-red-700 rounded-lg text-center font-medium mt-4 border border-red-100"
              >
                {errorMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
