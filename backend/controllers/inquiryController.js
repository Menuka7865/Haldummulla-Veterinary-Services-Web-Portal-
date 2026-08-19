const Inquiry = require('../models/Inquiry');

// @desc  Get all inquiries
// @route GET /api/inquiries
const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc  Create an inquiry
// @route POST /api/inquiries
const createInquiry = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const inquiry = await Inquiry.create({ name, email, subject, message });
    res.status(201).json(inquiry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc  Mark inquiry as read
// @route PUT /api/inquiries/:id/read
const markAsRead = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!inquiry) return res.status(404).json({ message: 'Inquiry not found' });
    res.json(inquiry);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc  Delete an inquiry
// @route DELETE /api/inquiries/:id
const deleteInquiry = async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Inquiry removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getInquiries, createInquiry, markAsRead, deleteInquiry };
