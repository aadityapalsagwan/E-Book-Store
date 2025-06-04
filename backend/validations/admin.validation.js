const { body, validationResult } = require('express-validator');

// Password must have: min 8 characters, at least one letter, one number, and one special character
const passwordRules = body('password')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters')
  .matches(/[a-zA-Z]/)
  .withMessage('Password must contain at least one letter')
  .matches(/[0-9]/)
  .withMessage('Password must contain at least one number')
  .matches(/[^a-zA-Z0-9]/)
  .withMessage('Password must contain at least one special character');

// Common validation function
const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

const emailAdminOnly = body('email')
  .notEmpty()
  .withMessage('Email is required')
  .custom((value) => {
    if (!value.endsWith('@admin.com')) {
      throw new Error("Only '@admin.com' domain emails are allowed");
    }
    return true;
  });

exports.signup = validate([
  emailAdminOnly,
  passwordRules,
]);

exports.login = validate([
  emailAdminOnly,
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
]);
