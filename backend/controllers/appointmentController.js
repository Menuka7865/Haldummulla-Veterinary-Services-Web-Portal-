const Appointment = require('../models/Appointment');

// @desc  Get all appointments
// @route GET /api/appointments
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc  Create an appointment
// @route POST /api/appointments
const createAppointment = async (req, res) => {
  try {
    const { farmer, phone, animal, service, date, time, notes } = req.body;
    const appointment = await Appointment.create({
      farmer, phone, animal, service, date, time, notes,
    });
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc  Update appointment status
// @route PUT /api/appointments/:id
const updateAppointmentStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    appointment.status = req.body.status || appointment.status;
    const updated = await appointment.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc  Delete an appointment
// @route DELETE /api/appointments/:id
const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Appointment removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAppointments, createAppointment, updateAppointmentStatus, deleteAppointment };
