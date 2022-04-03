const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    const token = req.query.token;
    if(!token){
        const error = new Error('Not authenticated!');
        error.statusCode = 401;
        throw error;
    }
    console.log(token);
    let decodedToken;
    try{
        decodedToken = jwt.verify(token,process.env.MONGO_SECRETKEY);
    } catch(err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken){
        const error = new Error('Not authenticated!');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};