const express = require("express");
const {
  User,
  Product,
  userAdder,
  productAdder,
  mongoose,
} = require("./mongocon");
const app = express();
const port = 8000;
const ObjectId = mongoose.Types.ObjectId;

module.exports = { express, User, Product, mongoose, app, port, ObjectId };
