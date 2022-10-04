const { body, validationResult } = require("express-validator");

const UserBodyRules = [
  body("username")
    .notEmpty()
    .trim()
    .escape()
    .isLength({ min: 6 })
    .withMessage("User name must be 6 or more characters"),
  body("email").notEmpty().trim().escape().isEmail().withMessage("Email is not valid"),
  body("password").isLength({ min: 8 }).withMessage("Password must be 8 or more characters"),
];

const idCheckBodyRules = [
  body("id")
    .notEmpty()
    .isInt()
    .custom((value) => {
      if (value <= 0) {
        throw new Error("id must be positive");
      } else {
        return value;
      }
    }),
];

const usernameCheckBodyRules = [
  body("username")
    .notEmpty()
    .trim()
    .escape()
    .isLength({ min: 6 })
    .withMessage("User name must be 6 or more characters"),
];

const checkRules = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), pass: req.body.password, conf: req.body.password_conf });
  }
  next();
};

const verifyUser = {
  UserBodyRules,
  idCheckBodyRules,
  usernameCheckBodyRules,
  checkRules,
};

module.exports = verifyUser;
