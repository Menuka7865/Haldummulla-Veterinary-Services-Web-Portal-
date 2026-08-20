const express = require('express');
const router = express.Router();
const {
  getServices,
  getAllServicesAdmin,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getServices);

// Admin-only routes (MUST come before /:id to avoid 'admin' being matched as an ID)
router.get('/admin/all', protect, admin, getAllServicesAdmin);
router.post('/', protect, admin, createService);
router.put('/:id', protect, admin, updateService);
router.delete('/:id', protect, admin, deleteService);

// Public single record route
router.get('/:id', getServiceById);

module.exports = router;
