const mongoose =require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    username:String,
    email:String,
    password:String,
    createdAt:Date
});

const User = mongoose.model('users', userSchema,"users");

module.exports= User;