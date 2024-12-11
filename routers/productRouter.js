const express = require('express')
const productRouter = express.Router()
const {getProducts,getProductById,createProduct,getTotalPrice,updateProduct,deleteProduct } = require('../controllers/productController')
const jwt= require('jsonwebtoken') 
require('dotenv').config()

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401); // No token provided
    console.log(token)
    console.log(process.env.JWT_SECRET_KEY)
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({err}); // Invalid token
        req.user = user; // Attach user payload to request
        next();
    });
};

productRouter.get('/',getProducts)
productRouter.post('/',createProduct)
productRouter.get('/price/totalPrice',getTotalPrice)
productRouter.get('/:id',getProductById )
productRouter.patch('/:id',updateProduct )
productRouter.delete('/:id',authenticateToken,deleteProduct )


module.exports = productRouter
