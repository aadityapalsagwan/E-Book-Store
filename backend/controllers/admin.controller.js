const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const Book = require('../models/Book');
const User = require('../models/User');
const Sale = require('../models/Order');
const Order = require('../models/Order');
const moment = require('moment');

let totalRevenue = 0;
let totalSales = 0;

// ✅ Admin Login
exports.loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // ✅ Check domain
    if (!email.endsWith('@admin.com')) {
      return res.status(403).json({ message: "Only '@admin.com' email allowed" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(admin._id, 'admin');
    res.status(200).json({ admin, token });
  } catch (err) {
    next(err);
  }
};

// ✅ Admin Signup
exports.signupAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // ✅ Check domain
    if (!email.endsWith('@admin.com')) {
      return res.status(403).json({ message: "Only '@admin.com' email allowed" });
    }

    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Admin already exists' });

    const count = await Admin.countDocuments();
    if (count >= 2)
      return res.status(403).json({ message: 'Admin limit reached (max 2 allowed)' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name, email, password: hashedPassword });

    const token = generateToken(admin._id, 'admin');
    res.status(201).json({ admin, token });
  } catch (err) {
    next(err);
  }
};

// ✅ Get logged-in admin profile
exports.getAdminProfile = async (req, res, next) => {
  try {
    const adminId = req.user.id;
    const admin = await Admin.findById(adminId).select('name email');
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    res.status(200).json(admin);
  } catch (err) {
    next(err);
  }
};

// ✅ (Optional) Create admin
exports.createAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!email.endsWith('@admin.com')) {
      return res.status(403).json({ message: "Only '@admin.com' email allowed" });
    }

    const newAdmin = new Admin({ name, email, password });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (err) {
    next(err);
  }
};

// ✅ Dashboard stats
exports.getDashboardStats = async (req, res, next) => {
  try {
    const sales = await Sale.find().populate('books.book');
    totalRevenue = 0;
    totalSales = 0;

    sales.forEach((sale) => {
      sale.books.forEach(({ book, quantity }) => {
        if (book && book.price) {
          totalRevenue += book.price * quantity;
          totalSales += quantity;
        }
      });
    });

    const booksCount = await Book.countDocuments();
    const usersCount = await User.countDocuments();

    res.status(200).json({
      books: booksCount,
      users: usersCount,
      sales: totalSales,
      revenue: totalRevenue,
    });
  } catch (err) {
    next(err);
  }
};

// ✅ Sales Report
exports.salesReport = async (req, res, next) => {
  try {
    const users = await User.find().populate('orders');

    const report = [];

    for (const user of users) {
      for (const orderId of user.orders) {
        const order = await Order.findById(orderId._id).populate('books.book');

        const bookNames = order.books
          .map(item => item.book?.title)
          .filter(Boolean);

        const reportEntry = {
          user: user.name,
          books: bookNames,
          date: order.createdAt,
          paymentMethod: order.paymentMethod
        };

        report.push(reportEntry);
      }
    }

    res.status(200).json(report);
  } catch (err) {
    next(err);
  }
};

// ✅ All Orders with User & Book Info
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate('books.book', 'title image price');

    res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

// ✅ Update Order Status
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { deliveryStatus } = req.body;

  if (!['Processing', 'Shipped', 'Delivered'].includes(deliveryStatus)) {
    return res.status(400).json({ message: 'Invalid delivery status' });
  }

  try {
    const updateFields = { deliveryStatus };

    if (deliveryStatus === 'Delivered') {
      updateFields.deliveryDate = new Date();
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    )
      .populate('userId', 'name email')
      .populate('books.book', 'title image price');

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated', order: updatedOrder });
  } catch (error) {
    console.error('Error updating delivery status:', error);
    res.status(500).json({ message: 'Failed to update order', error: error.message });
  }
};

// ✅ Dashboard Graph Data
exports.getDashboardData = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalSales = await Order.countDocuments();

    const totalRevenueData = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);
    const totalRevenue = totalRevenueData[0]?.total || 0;

    const lastYear = moment().subtract(11, 'months').startOf('month').toDate();

    const monthlyData = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: lastYear },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          sales: { $sum: 1 },
          revenue: { $sum: "$total" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    const formattedSales = [];
    const formattedRevenue = [];

    for (let i = 0; i < 12; i++) {
      const date = moment().subtract(11 - i, 'months');
      const entry = monthlyData.find(
        (d) => d._id.year === date.year() && d._id.month === date.month() + 1
      );

      formattedSales.push({
        month: date.format('MMM YYYY'),
        value: entry?.sales || 0,
      });

      formattedRevenue.push({
        month: date.format('MMM YYYY'),
        value: entry?.revenue || 0,
      });
    }

    res.json({
      books: totalBooks,
      users: totalUsers,
      sales: totalSales,
      revenue: totalRevenue,
      monthlySales: formattedSales,
      monthlyRevenue: formattedRevenue,
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ Get All Users with Orders
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('orders');
    res.status(200).json({ users });
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
