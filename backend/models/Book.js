const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  description: String,
  category: String,
  image: String, // store Cloudinary image URL

  // Reference to Review model
reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],


  averageRating: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Book', bookSchema);
