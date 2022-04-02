const express = require("express");
const authController = require("../controller/auth");
const { body } = require("express-validator/check");

const User = require("../model/user");

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 })
  ],
  authController.signup
);

router.post('/login',authController.login);

module.exports = router;
