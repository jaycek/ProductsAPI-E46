const express = require('express')
const mongoose = require('mongoose')
const productRouter = require('./routers/productRouter')
const userRouter = require('./routers/userRouter')
const jwt = require('jsonwebtoken')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT
app.use(express.json())
app.use(cors())
const mongourl = process.env.MONGODB_URL

app.get('/', (req, res) => {
  res.send('Hello World!')
})

main()
.then(()=>console.log("DB connected"))
.catch(err => console.log(err));


async function main() {
  await mongoose.connect(mongourl)
}

app.use(express.json())
app.post('/login',(req,res)=>{
  //Authenticate the user
  const username = req.body.username
  const user = {name:username}
  console.log(process.env.JWT_SECRET_KEY)
  const token =  jwt.sign(user,process.env.JWT_SECRET_KEY)
  res.json({accesstoken:token})

})

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401); // No token provided

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403); // Invalid token
      req.user = user; // Attach user payload to request
      next();
  });
};
app.post('/new',authenticateToken,(req,res)=>{
  res.send("You can add a new functionality")
})

app.use('/products',productRouter)
app.use('/users',userRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
