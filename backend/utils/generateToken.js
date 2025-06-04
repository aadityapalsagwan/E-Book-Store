const jwt = require('jsonwebtoken');

const generateToken = (id, role = 'user') => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '1h', // 1 hour expiry handled both here and in middleware
  });
};

module.exports = generateToken;
