const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./router/auth');

const app = express();
app.use(bodyParser.json());

app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
});

app.use(authRouter);


app.listen(3000,()=>{
    console.log('Connected!');
});