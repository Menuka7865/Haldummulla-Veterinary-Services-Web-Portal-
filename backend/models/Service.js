const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema(
  {
    icon: {
      type: String,
      default: '🩺',
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: [
        'Clinical Care',
        'Preventive Healthcare',
        'Emergency Response',
        'Livestock Development',
        'Tele-Veterinary Support',
        'Knowledge Hub',
        'Other',
      ],
      default: 'Other',
    },
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a short description'],
    },
    fullOverview: {
      type: String,
      default: '',
    },
    keyPoints: {
      type: [String],
      default: [],
    },
    targetAudience: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: '',
    },
    actionText: {
      type: String,
      default: 'Learn More',
    },
    actionLink: {
      type: String,
      default: '/contact',
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    order: {
      type: Number,
      default: 0,
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

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
