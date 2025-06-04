require('../models'); // Registers all models first

const mongoose = require('mongoose');
const Review = mongoose.model('Review'); // ✅ This way it will always be defined

const Book = require('../models/Book');
const User = require('../models/User');


exports.addOrUpdateReview = async (req, res) => {
  const { bookId } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user._id; // Make sure `req.user` is set by your auth middleware

  try {
    // ✅ Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // ✅ Check if review exists
    let existingReview = await Review.findOne({ user: userId, book: bookId });

    if (existingReview) {
      // ✅ Update existing review
      existingReview.rating = rating;
      existingReview.comment = comment || existingReview.comment;
      await existingReview.save();

      return res.status(200).json({
        message: 'Review updated',
        review: existingReview,
      });
    }

    // ✅ Create new review
    const newReview = new Review({
      user: userId,
      book: bookId,
      rating,
      comment,
    });

    await newReview.save();

    // ✅ Push to book.reviews
    book.reviews.push(newReview._id);
    await book.save();

    // ✅ Push to user.reviews
    await User.findByIdAndUpdate(userId, {
      $push: { reviews: newReview._id },
    });

    res.status(201).json({
      message: 'Review added',
      review: newReview,
    });
  } catch (error) {
    console.error('Error adding/updating review:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
