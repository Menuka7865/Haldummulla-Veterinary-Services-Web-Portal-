const Service = require('../models/Service');

// @desc    Get all active services (public)
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
  try {
    const { status, category } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (category && category !== 'All') filter.category = category;

    const services = await Service.find(filter).sort({ order: 1, createdAt: 1 });
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all services including inactive (admin)
// @route   GET /api/services/admin/all
// @access  Private/Admin
const getAllServicesAdmin = async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: 1 });
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single service by ID
// @route   GET /api/services/:id
// @access  Public
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a service
// @route   POST /api/services
// @access  Private/Admin
const createService = async (req, res) => {
  try {
    const {
      icon,
      category,
      title,
      description,
      fullOverview,
      keyPoints,
      targetAudience,
      location,
      actionText,
      actionLink,
      status,
      order,
    } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ message: 'Please provide title, description, and category' });
    }

    const service = await Service.create({
      icon: icon || '🩺',
      category,
      title,
      description,
      fullOverview: fullOverview || '',
      keyPoints: keyPoints || [],
      targetAudience: targetAudience || '',
      location: location || '',
      actionText: actionText || 'Learn More',
      actionLink: actionLink || '/contact',
      status: status || 'Active',
      order: order || 0,
      createdBy: req.user._id,
    });

    res.status(201).json(service);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const fields = [
      'icon', 'category', 'title', 'description', 'fullOverview',
      'keyPoints', 'targetAudience', 'location', 'actionText',
      'actionLink', 'status', 'order',
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        service[field] = req.body[field];
      }
    });

    const updated = await service.save();
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Private/Admin
const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    await service.deleteOne();
    res.json({ message: 'Service removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getServices,
  getAllServicesAdmin,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
