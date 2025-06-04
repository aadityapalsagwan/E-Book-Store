const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if admin exists
    const isAdmin = await Admin.findById(decoded.id);
    if (!isAdmin) return res.status(403).json({ message: 'Admin not found' });

    // Count total admins in DB
    const totalAdmins = await Admin.countDocuments();
    if (totalAdmins > 2)
      return res.status(403).json({ message: 'Admin limit reached (max 2)' });

    // Set req.user for further use in controllers
    req.user = decoded;

    next();
  } catch (err) {
    console.error('Admin auth error:', err);
    res.status(401).json({ message: 'Unauthorized admin access' });
  }
};
