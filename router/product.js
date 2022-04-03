const productController = require('../controller/product');
const isAuth = require('../is-Auth/is-Auth');

const express = require('express');

const router = express.Router();

router.get('/user-list',productController.userlist);  //To get the list of all users

router.get('/details',productController.detail); //To fetch details of user

router.post('/upload',productController.upload); //To upload the csv files

router.get('/product-list',productController.productList); //To fetch list of products


module.exports= router;