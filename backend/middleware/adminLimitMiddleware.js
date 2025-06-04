const Admin = require('../models/Admin');

exports.checkAdminLimit = async (req, res, next) => {
  try {
    const totalAdmins = await Admin.countDocuments();
    if (totalAdmins >= 2) {
      return res.status(403).json({ message: 'Admin limit reached (max 2)' });
    }
    next();
  } catch (err) {
    next(err);
  }
};
