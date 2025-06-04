const express = require('express');
const router = express.Router();

const {
  signup,
  login,
  editName,
  changePassword,
  getProfile, // ✅ Add getProfile controller
  addToCart,
  getCart,
  removeFromCart
} = require('../controllers/user.controller');

const validate = require('../validations/user.validation');
const auth = require('../middleware/auth.middleware');

// Public routes
router.post('/signup', validate.signup, signup);
router.post('/login', validate.login, login);

// Protected routes
router.get('/profile', auth, getProfile); // ✅ GET profile (name + email)
router.put('/edit-name', auth, editName);
router.put('/change-password', auth, changePassword);
router.post('/cart', auth, addToCart); // ✅ Add to cart
router.get('/cart', auth, getCart); // ✅ Get user's cart
router.delete('/cart/:bookId', auth, removeFromCart); // ✅ Remove item from cart


module.exports = router;
