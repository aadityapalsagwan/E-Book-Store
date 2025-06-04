backend/
│
├── config/
│   └── db.js                        # MongoDB connection
│
├── controllers/
│   ├── user.controller.js          # Client logic (signup/login)
│   ├── admin.controller.js         # Admin logic
│   ├── book.controller.js          # Books + reviews
│   └── order.controller.js         # Order logic
│
├── models/
│   ├── User.js                     # Client schema
│   ├── Admin.js                    # Admin schema (limit 2)
│   ├── Book.js                     # Book schema with reviews
│   └── Order.js                    # Order schema (who bought what)
│
├── routes/
│   ├── user.routes.js              # /api/users/
│   ├── admin.routes.js             # /api/admin/
│   ├── book.routes.js              # /api/books/
│   └── order.routes.js             # /api/orders/
│
├── middleware/
│   ├── auth.middleware.js          # Client token auth
│   ├── admin.middleware.js         # Admin token + limit
│   └── error.middleware.js         # Error handling
│
├── utils/
│   ├── generateToken.js            # JWT token helper
│   └── generateOrderId.js          # Order ID formatter
│
├── validations/
│   ├── user.validation.js          # Signup/Login input validation
│   └── book.validation.js          # Book create/review validation
│
├── app.js                          # Express setup
├── server.js                       # App runner
├── .env                            # Environment variables
└── package.json                    # Node dependencies
