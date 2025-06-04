const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, default: '' },
  },
  { timestamps: true }
);

// Ensure user can review each book only once
reviewSchema.index({ user: 1, book: 1 }, { unique: true });

mongoose.model('Review', reviewSchema); // ✅ Register the model
module.exports = mongoose.model('Review'); // ✅ Export the model for use in other files        