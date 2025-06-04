const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Optional: Use exp claim if exists instead of manual iat check
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      return res.status(401).json({ message: 'Token expired' });
    }

    // If you want to manually check iat and limit session time, e.g., 24 hours:
    const now = Math.floor(Date.now() / 1000);
    if (!decoded.exp && now - decoded.iat > 86400) { // 86400 seconds = 24 hours
      return res.status(401).json({ message: 'Token expired' });
    }

    // Fetch user from DB to set on req.user
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user; // now req.user has full user object except password

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
