const express = require('express');
const router = express.Router();
const {
  getInquiries,
  createInquiry,
  markAsRead,
  deleteInquiry,
} = require('../controllers/inquiryController');

router.get('/', getInquiries);
router.post('/', createInquiry);
router.put('/:id/read', markAsRead);
router.delete('/:id', deleteInquiry);

module.exports = router;
