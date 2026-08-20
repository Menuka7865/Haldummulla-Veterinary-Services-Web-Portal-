const Resource = require('../models/Resource');

// @desc    Get all active resources by section (public)
// @route   GET /api/resources
// @access  Public
const getResources = async (req, res) => {
  try {
    const { section, status } = req.query;

    const filter = {};
    if (section) filter.section = section;
    if (status) filter.status = status;

    const resources = await Resource.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all resources including inactive (admin)
// @route   GET /api/resources/admin/all
// @access  Private/Admin
const getAllResourcesAdmin = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ section: 1, order: 1, createdAt: -1 });
    res.json(resources);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single resource by ID
// @route   GET /api/resources/:id
// @access  Public
const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.json(resource);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a resource
// @route   POST /api/resources
// @access  Private/Admin
const createResource = async (req, res) => {
  try {
    const { section, title, ...otherFields } = req.body;

    if (!section || !title) {
      return res.status(400).json({ message: 'Please provide section and title' });
    }

    const resource = await Resource.create({
      section,
      title,
      ...otherFields,
      createdBy: req.user._id,
    });

    res.status(201).json(resource);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a resource
// @route   PUT /api/resources/:id
// @access  Private/Admin
const updateResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    const updated = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a resource
// @route   DELETE /api/resources/:id
// @access  Private/Admin
const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    await resource.deleteOne();
    res.json({ message: 'Resource removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getResources,
  getAllResourcesAdmin,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
};
