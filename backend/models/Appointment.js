const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema(
  {
    farmer: { type: String, required: true },
    phone: { type: String, required: true },
    animal: { type: String, required: true },
    service: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    notes: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
