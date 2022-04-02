const User = require("../model/user");

exports.getSignup = (req, res, next) => {
  res.status(200).json({
    message: "Hello from Manjeet Singh",
    email: "Enter E-mail",
    password: "Enter Password",
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  
  const user = new User({
    email:email,
    password:password
  });
  user.save();
  res.status(201).json({
    message:"You have signup successfully!"
  })
};
