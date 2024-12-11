const User =require("../models/userModel.js") 
const bcrypt =require('bcrypt') 
const jwt= require('jsonwebtoken') 
require('dotenv').config()

const addUser = async (req,res)=>{

  try {
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, async(err, hash) => {
    if (err) {
      console.error('Error occurred while hashing:', err);
      res.status(500).json({error:'Internal Server error'})
    }
  
      var userItem = {
        name : req.body.name,
        email: req.body.email,
        username : req.body.username,
        password : hash,
        createdAt:new Date()
      }
      var user = new User(userItem)
      await user.save()
      res.status(201).json(user)
});
  } catch (error) {
    console.log(error)
    res.status(500).json({error:'Internal Server error'})
  }
      
  }

  const login = async (req,res)=>{
    try {
      const {email,password} = req.body
      console.log(email)
      console.log(password)

      const user = await User.findOne({email:email})
      if(!user){
        return res.status(500).json({message:"User not found"})
      }
      const isValid = await bcrypt.compare(password,user.password)
      console.log(isValid)
      if(!isValid){
        return res.status(500).json({message:"Invalid credentials"})
      }
      let payload={user:email,pwd:password};
      const secret_key = process.env.JWT_SECRET_KEY

      let token = jwt.sign(payload,secret_key)

      res.status(200).json({message:"Login successful",token:token})
    } catch (error) {
      console.log(error)
    res.status(500).json({error:'Internal Server error'})
    }
  }
  module.exports= {login,addUser}