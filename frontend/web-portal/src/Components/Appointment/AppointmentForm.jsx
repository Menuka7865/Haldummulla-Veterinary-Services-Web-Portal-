import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AppointmentForm = ({ onAddAppointment }) => {
  const [formData, setFormData] = useState({
    serviceType: '',
    animalType: '',
    contactNumber: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  });

  const [touched, setTouched] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // Validation Rules
  const validate = () => {
    const errors = {};
    if (!formData.serviceType) errors.serviceType = 'Service Type is required.';
    if (!formData.animalType) errors.animalType = 'Animal Type is required.';
    
    const phoneRegex = /^\d{1,10}$/;
    if (!formData.contactNumber) {
      errors.contactNumber = 'Contact Number is required.';
    } else if (!phoneRegex.test(formData.contactNumber)) {
      errors.contactNumber = 'Contact Number must be up to 10 digits.';
    } else if (formData.contactNumber.length !== 10) {
      errors.contactNumber = 'Contact Number must be exactly 10 digits.';
    }

    if (!formData.preferredDate) {
      errors.preferredDate = 'Please select a date.';
    }

    if (!formData.preferredTime) {
      errors.preferredTime = 'Please select a time.';
    }
    
    if (formData.notes.length > 300) {
      errors.notes = 'Notes cannot exceed 300 characters.';
    }

    return errors;
  };

  const errors = validate();
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // special handling for contact number (only numbers)
    if (name === 'contactNumber') {
      const numbersOnly = value.replace(/[^0-9]/g, '');
      if (numbersOnly.length <= 10) {
        setFormData({ ...formData, [name]: numbersOnly });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      // Create new appointment object
      const newAppointment = {
        id: Date.now().toString(),
        date: formData.preferredDate,
        time: formData.preferredTime,
        service: formData.serviceType,
        status: 'Pending', // default status
      };

      onAddAppointment(newAppointment);

      // Clear form
      setFormData({
        serviceType: '',
        animalType: '',
        contactNumber: '',
        preferredDate: '',
        preferredTime: '',
        notes: '',
      });
      setTouched({});
      
      // Show success
      setSuccessMessage('Appointment booked successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="w-full max-w-4xl mx-auto -mt-10 relative z-10 px-4 md:px-0">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">New Appointment Details</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Service Type */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-colors ${
                  touched.serviceType && errors.serviceType ? 'border-red-500' : 'border-gray-200'
                }`}
              >
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
              <select
                name="animalType"
                value={formData.animalType}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-colors ${
                  touched.animalType && errors.animalType ? 'border-red-500' : 'border-gray-200'
                }`}
              >
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
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your phone number"
                className={`w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-colors ${
                  touched.contactNumber && errors.contactNumber ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {touched.contactNumber && errors.contactNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.contactNumber}</p>
              )}
            </div>

            {/* Preferred Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                onBlur={handleBlur}
                min={today}
                className={`w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-colors ${
                  touched.preferredDate && errors.preferredDate ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {touched.preferredDate && errors.preferredDate && (
                <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>
              )}
            </div>

            {/* Preferred Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
              <select
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-colors ${
                  touched.preferredTime && errors.preferredTime ? 'border-red-500' : 'border-gray-200'
                }`}
              >
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
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Any specific details or concerns..."
                rows="4"
                className={`w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-colors resize-none ${
                  touched.notes && errors.notes ? 'border-red-500' : 'border-gray-200'
                }`}
              ></textarea>
              <div className="flex justify-between items-center mt-1">
                {touched.notes && errors.notes ? (
                  <p className="text-red-500 text-xs">{errors.notes}</p>
                ) : (
                  <span></span>
                )}
                <p className="text-xs text-gray-400">{formData.notes.length}/300</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-4 rounded-xl text-white font-semibold transition-all duration-300 ${
              isValid 
                ? 'bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg' 
                : 'bg-green-300 cursor-not-allowed'
            }`}
          >
            Book Appointment
          </button>

          {/* Success Message */}
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
          </AnimatePresence>

        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
