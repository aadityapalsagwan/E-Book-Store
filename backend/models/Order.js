const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  books: [
    {
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      bookTitle: {
        type: String, // optional if you want to store the title directly
      }
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['UPI', 'Cash on Delivery'],
    required: true,
  },
  upiId: {
    type: String,
  },
  deliveryStatus: {
    type: String,
    enum: ['Processing', 'Shipped', 'Delivered'],
    default: 'Processing',
  },
  deliveryDate: {
    type: Date,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Order', orderSchema);
