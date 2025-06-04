const express = require('express');
const router = express.Router();
const { loginAdmin, signupAdmin, getDashboardStats, salesReport, getAllOrders, updateOrderStatus, getAllUsers , getAdminProfile } = require('../controllers/admin.controller');
const validate = require('../validations/admin.validation');
const auth = require('../middleware/admin.middleware');


router.post('/signup', validate.signup, signupAdmin);
router.post('/login', validate.login, loginAdmin);
router.get('/profile', auth, getAdminProfile);



// Dashboard stats route
router.get('/', getDashboardStats);
router.get('/sales', salesReport);

router.get('/orders',   getAllOrders);

router.put('/orders/:id/status', updateOrderStatus);
// Route to get all users
router.get('/users', getAllUsers);


module.exports = router;
