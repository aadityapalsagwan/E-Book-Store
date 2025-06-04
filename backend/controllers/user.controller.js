const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

exports.signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = generateToken(user._id);
    res.status(201).json({ user, token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);
    res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
};

// Edit user name
exports.editName = async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name;
    await user.save();

    res.status(200).json({ message: 'Name updated successfully', user });
  } catch (err) {
    next(err);
  }
};

// Change password
exports.changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user.id;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New passwords do not match' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect current password' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    next(err);
  }
};

// Get logged-in user profile
exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log('Fetching profile for user:', userId);

    const user = await User.findById(userId).select('name email');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};


// Add to cart
exports.addToCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { bookId, quantity } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const existingItem = user.cart.find(item => item.book.toString() === bookId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ book: bookId, quantity });
    }

    await user.save();
    res.status(200).json({ message: 'Book added to cart', cart: user.cart });
  } catch (err) {
    next(err);
  }
};

// Get Cart
exports.getCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate('cart.book', 'title price image');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ cart: user.cart });
  } catch (err) {
    next(err);
  }
};

// Remove from cart
exports.removeFromCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { bookId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.cart = user.cart.filter(item => item.book.toString() !== bookId);
    await user.save();

    res.status(200).json({ message: 'Book removed from cart', cart: user.cart });
  } catch (err) {
    next(err);
  }
};
