const { body, validationResult } = require('express-validator');

const allowedDomains = ['gmail.com', 'outlook.com'];

const passwordRules = body('password')
  .isLength({ min: 8 })
  .matches(/[a-zA-Z]/)
  .matches(/[0-9]/)
  .matches(/[^a-zA-Z0-9]/)
  .withMessage('Password must be at least 8 characters long and include letters, numbers, and special characters.');

const emailWithDomainCheck = body('email')
  .isEmail().withMessage('Valid email is required')
  .custom((email) => {
    const domain = email.split('@')[1];
    if (!allowedDomains.includes(domain)) {
      throw new Error('Only @gmail.com and @outlook.com emails are allowed');
    }
    return true;
  });

const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map(validation => validation.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

exports.signup = validate([
  body('name').notEmpty().withMessage('Name is required'),
  emailWithDomainCheck,
  passwordRules
]);

exports.login = validate([
  emailWithDomainCheck,
  passwordRules
]);
