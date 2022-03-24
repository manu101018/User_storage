const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
    next();
});

app.get('/feed',(req,res,next)=>{
    res.status(200).json({message: 'hello from manjeet singh',title:'Manjeet Singh',content:'This is my personal project'});
});


app.post('/posts',(req,res,next)=>{
    const title = req.body.title;
    const content =req.body.content;
    const message = req.body.message;
    res.status(201).json({
        _id: new Date().getHours().toString(),
        message:message,
        title:title,
        content:content
    });
});

app.listen(3000,()=>{
    console.log('Connected!');
});