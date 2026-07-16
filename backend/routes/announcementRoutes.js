const express = require('express');
const router = express.Router();
const {
  getAnnouncements,
  getAllAnnouncementsAdmin,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} = require('../controllers/announcementController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAnnouncements);

// Admin-only routes (MUST come before /:id to avoid 'admin' being matched as an ID)
router.get('/admin/all', protect, admin, getAllAnnouncementsAdmin);
router.post('/', protect, admin, createAnnouncement);
router.put('/:id', protect, admin, updateAnnouncement);
router.delete('/:id', protect, admin, deleteAnnouncement);

// Public single record route (last, so specific paths aren't caught here)
router.get('/:id', getAnnouncementById);

module.exports = router;
