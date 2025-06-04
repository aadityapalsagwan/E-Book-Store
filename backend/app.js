const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const bookRoutes = require('./routes/book.routes');
const orderRoutes = require('./routes/order.routes');
const reviewroutes = require('./routes/review.routes');
const errorHandler = require('./middleware/error.middleware');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/review', reviewroutes);

// Error middleware
app.use(errorHandler);

module.exports = app;
