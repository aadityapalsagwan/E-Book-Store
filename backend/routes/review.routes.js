const express = require('express');
const router = express.Router();

const { addOrUpdateReview } = require('../controllers/review.controller');
const protect = require('../middleware/auth.middleware');

// Add a new review
router.post('/:bookId', protect,  addOrUpdateReview);

// Update existing review (explicit route if you want to use PUT)
// router.put('/:bookId', protect,  addOrUpdateReview);

module.exports = router;
