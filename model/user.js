const mongoose = require('mongoose');

const Schema =mongoose.Schema;

const userSchema = new Schema({
    email:{
        require:true,
        type:String
    },
    password:{
        type:String,
        require:true
    }
});

module.exports = mongoose.model("User", userSchema);