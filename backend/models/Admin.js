const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: String,
  password: String,
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
