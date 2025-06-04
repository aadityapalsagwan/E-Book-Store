const express = require('express');
const router = express.Router();

const {
  createBook,
  getBooks,
  getBookById,
  addReview,
  updateBook,
  deleteBook,
  upload, // multer middleware
} = require('../controllers/book.controller');

const adminAuth = require('../middleware/admin.middleware');
const validate = require('../validations/book.validation');

// 📚 Get all books
router.get('/', getBooks);

// 📖 Get single book by ID (with reviews)
router.get('/:id', getBookById); // ✅ NEW

// ➕ Add a book with image upload
router.post('/', upload.single('image'), createBook);

// ✍️ Add a review
router.post('/:bookId/review', validate.addReview, addReview);

// ✏️ Update a book
router.put('/:id', adminAuth, validate.updateBook, updateBook);

// ❌ Delete a book
router.delete('/:id', adminAuth, deleteBook);


module.exports = router;
