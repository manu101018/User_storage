const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv').config();

const authRouter = require("./router/auth");

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use(authRouter);

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    app.listen(process.env.MONGO_PORT);
    console.log("Connected!");
  })
  .catch((err) => {
    console.log(err);
  });
