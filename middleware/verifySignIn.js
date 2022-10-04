const { body, validationResult } = require("express-validator");

const loginBodyRules = [
  body("username")
    .notEmpty()
    .trim()
    .escape()
    .isLength({ min: 6 })
    .withMessage("User name must be 6 or more characters"),
  body("password").isLength({ min: 8 }).withMessage("Password must be 8 or more characters"),
];

const checkRules = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), pass: req.body.password, conf: req.body.password_conf });
  }
  next();
};

const verifySignIn = {
  loginBodyRules,
  checkRules,
};

module.exports = verifySignIn;
