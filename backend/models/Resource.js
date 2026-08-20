const mongoose = require('mongoose');

const resourceSchema = mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
      enum: ['featured', 'article', 'video', 'download'],
    },

    // ── Shared fields ────────────────────────────────────────────
    title: {
      type: String,
      required: [true, 'Please add a title'],
      trim: true,
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

    // ── Featured Resources ───────────────────────────────────────
    icon: { type: String, default: '' },            // emoji
    description: { type: String, default: '' },
    fullContent: { type: String, default: '' },     // For popup modal
    buttonLabel: { type: String, default: 'Read More' },

    // ── Latest Articles ──────────────────────────────────────────
    excerpt: { type: String, default: '' },
    fullContent: { type: String, default: '' },     // For popup modal
    imageUrl: { type: String, default: '' },

    // ── Videos ──────────────────────────────────────────────────
    duration: { type: String, default: '' },        // e.g. "5 min"
    videoUrl: { type: String, default: '' },

    // ── Downloads ────────────────────────────────────────────────
    fileUrl: { type: String, default: '' },         // link to PDF/file

    // ── Meta ─────────────────────────────────────────────────────
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;
