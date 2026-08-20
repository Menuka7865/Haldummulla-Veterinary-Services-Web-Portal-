const express = require('express');
const router = express.Router();
const {
  getResources,
  getAllResourcesAdmin,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
} = require('../controllers/resourceController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getResources);

// Admin-only routes (MUST come before /:id to avoid 'admin' being matched as an ID)
router.get('/admin/all', protect, admin, getAllResourcesAdmin);
router.post('/', protect, admin, createResource);
router.put('/:id', protect, admin, updateResource);
router.delete('/:id', protect, admin, deleteResource);

// Public single record route
router.get('/:id', getResourceById);

module.exports = router;
