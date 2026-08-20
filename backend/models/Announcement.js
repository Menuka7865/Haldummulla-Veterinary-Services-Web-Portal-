const mongoose = require('mongoose');

const announcementSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Please add a date'],
    },
    status: {
      type: String,
      enum: ['Active', 'Expired'],
      default: 'Active',
    },
    content: {
      type: String,
      required: [true, 'Please add content'],
    },
    category: {
      type: String,
      enum: [
        'Vaccination Program',
        'Awareness Program',
        'Farmer Service',
        'Breeding Service',
        'General',
      ],
      default: 'General',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
