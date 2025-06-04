const { body, validationResult } = require('express-validator');

// Generic validator function
const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map(validation => validation.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

// Validation for creating a book
exports.createBook = validate([
  body('title').notEmpty().withMessage('Title is required'),
  body('author').notEmpty().withMessage('Author is required'),
  body('description').notEmpty().withMessage('description is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
]);

// Validation for adding a review
exports.addReview = validate([
  body('user').notEmpty().withMessage('User is required'),
  body('comment').notEmpty().withMessage('Comment is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
]);

// ✅ Validation for updating a book
exports.updateBook = validate([
  body('title').notEmpty().withMessage('Title cannot be empty'),
  body('author').notEmpty().withMessage('Author cannot be empty'),
  body('description').notEmpty().withMessage('description cannot be empty'),
  body('price')
    .isFloat({ gt: 0 })
    .withMessage('Price must be greater than 0'),
]);
