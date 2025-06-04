// models/index.js
const mongoose = require('mongoose');

// Load all models once here
require('./User');
require('./Book');
require('./Review');

// Export Mongoose for use
module.exports = mongoose;
