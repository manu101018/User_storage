const express =require('express');
const authController = require('../controller/auth');

const router = express.Router();

router.get('/signup',authController.getSignup);

router.post('/signup',authController.postSignup);

module.exports= router;