const { body, validationResult } = require("express-validator");

const addEventBodyRules = [
  body("title").notEmpty().trim().escape().isString(),
  body("comment").notEmpty().isString(),
  body("start").notEmpty().isISO8601(),
  body("end").optional({ nullable: true, checkFalsy: true }).isISO8601(),
  body("allDay")
    .optional({ checkFalsy: true })
    .custom((value) => {
      if (value == 0 || value == 1) {
        return value;
      } else {
        throw new Error("Allday is either 1 or 0");
      }
    }),
];

const updateEventBodyRules = [
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
  body("title").notEmpty().trim().escape().isString(),
  body("comment").notEmpty().isString(),
  body("start").notEmpty().isISO8601(),
  body("end").optional({ checkFalsy: true }).isISO8601(),
  body("allDay")
    .optional({ checkFalsy: true })
    .custom((value) => {
      if (value == 0 || value == 1) {
        return value;
      } else {
        throw new Error("Allday is either 1 or 0");
      }
    }),
  body("status")
    .notEmpty()
    .custom((value) => {
      const possibleStatus = ["pending", "validated", "rejected"];
      if (possibleStatus.includes(value)) {
        return value;
      } else {
        throw new Error("Status is not valid");
      }
    }),
];

const updateStatusBodyRules = [
  body("status")
    .notEmpty()
    .custom((value) => {
      const possibleStatus = ["pending", "validated", "rejected"];
      if (possibleStatus.includes(value)) {
        return value;
      } else {
        throw new Error("Status is not valid");
      }
    }),
];

const deleteEventBodyRules = [
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

const checkRules = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), pass: req.body.password, conf: req.body.password_conf });
  }
  next();
};

const verifyEvent = {
  addEventBodyRules,
  updateEventBodyRules,
  updateStatusBodyRules,
  deleteEventBodyRules,
  checkRules,
};

module.exports = verifyEvent;
