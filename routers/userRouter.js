const express =require('express')
const { login,addUser} =require('../controllers/userController.js')


const userRouter = express.Router()

userRouter.get('/',(req,res)=>{
    res.send('Inside users')
})
userRouter.post('/',addUser)
userRouter.post('/login',login)


module.exports= userRouter