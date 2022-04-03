const express = require("express");
const authController = require("../controller/auth");
const { body } = require("express-validator/check");

const User = require("../model/user");

const router = express.Router();

router.post(
  "/signup",
  [
    body("username")
      .isString()
      .isLength({min: 5 })
      .withMessage("Please enter a valid username.")
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("username already exists!");
          }
        });
      }),
    body("password").trim().isLength({ min: 5 })
  ],
  authController.signup
);

router.post('/login',authController.login);

module.exports = router;
