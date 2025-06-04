const Order = require('../models/Order');
const User = require('../models/User');
const generateOrderId = require('../utils/generateOrderId');

// 📌 Place Order
exports.placeOrder = async (req, res, next) => {
  try {
    const {
      userId,
      name,
      mobile,
      pincode,
      address,
      books,
      paymentMethod,
      upiId,
      total,
      fromCart
    } = req.body;

    // Validate required fields
    if (!userId || !name || !mobile || !pincode || !address || !books || !total) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate payment method
    if (!['UPI', 'Cash on Delivery'].includes(paymentMethod)) {
      return res.status(400).json({ message: 'Invalid payment method' });
    }

    // Generate a unique order ID
    const orderId = generateOrderId();

    // Set estimated delivery date (7 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);

    // Prepare order data
    const orderData = {
      userId,
      orderId,
      name,
      mobile,
      pincode,
      address,
      books, // This should include `book`, `quantity`, and optionally `bookTitle`
      total,
      paymentMethod,
      deliveryStatus: 'Processing',
      deliveryDate,
    };

    // Add UPI ID if needed
    if (paymentMethod === 'UPI') {
      if (!upiId) {
        return res.status(400).json({ message: 'UPI ID is required for UPI payments' });
      }
      orderData.upiId = upiId;
    }

    // Create the order
    const order = await Order.create(orderData);

    // Update user's order list and optionally clear cart
    const update = { $push: { orders: order._id } };
    if (fromCart) {
      update.$set = { cart: [] };
    }

    await User.findByIdAndUpdate(userId, update);

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};


// 📌 Get All Orders for a User
exports.getUserOrders = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Find orders by userId field, not user
    const orders = await Order.find({ userId }).populate('books.book');

    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};
