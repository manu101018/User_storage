const User = require("../model/user");
const Product = require("../model/product");
const fs = require("fs");
const csv = require("csv-parser");

exports.userlist = (req, res, next) => {
  User.find()
    .then((user) => {
        res.status(201).json({users:user});
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.detail = (req, res, next) => {
  const userId = req.query.userId;
  User.findOne({ _id: userId.toString() })
    .then((user) => {
      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }
      return res.status(201).json({
        userDetails: {
          Firstname: user.firstName,
          Lastname: user.lastName,
          username: user.username,
        },
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.upload = (req, res, next) => {
  const userId = req.query.userId;
  const file = req.files.csvFile;
  file.mv("./uploads/" + file.name, (err, result) => {
    if (err) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
  });
  fs.createReadStream("./uploads/" + file.name)
    .pipe(csv())
    .on("data", (data) => {
      const name = data.name;
      const description = data.description;
      const quantity = data.quantity;
      const price = data.price;
      const product = new Product({
        name: name,
        description: description,
        quantity: quantity,
        price: price,
        _createdBy: userId,
      });
      product.save();
    })
    .on("end");
  res.status(201).json({ message: "Upload successful!" });
};

exports.productList = (req, res, next) => {
  const userId = req.query.userId;
  Product.find({ _createdBy: userId.toString() })
    .then((prodData) => {
      if (!prodData) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      console.log(prodData);
      res.status(201).json({ productList: prodData });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
