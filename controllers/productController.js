const ProductData = require('../models/product')

const getProducts = async (req,res)=>{
    // res.send("Products from server")
    try {
            const products = await ProductData.find()
            res.status(200).json(products);
          } catch (error) {
              res.status(500).json({ error: error.message });
          }
}
const getProductById = async (req, res) => {
    try {
        console.log(req.params.id)
        const product = await ProductData.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    };

    const createProduct = async (req, res) => {
       
        const {name,price,description,image} = req.body
    
        try {
            const newProduct = new ProductData({name,price,description,image})
            await newProduct.save()
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
           
        }
//Update
const updateProduct = async (req, res) => {
    try {
      const updatedProduct = await ProductData.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
      res.json(updatedProduct);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
const getTotalPrice = async (req,res)=>{
    try {
        const totalPrice = await ProductData.aggregate([
            {
                $group: {
                    _id: null,  // Group by `null` to sum across all documents
                    totalAmount: { $sum: "$price" }  // Calculate the sum of the `price` field
                }
            }
        ])
        res.status(200).json({totalPrice})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
      const deletedProduct = await ProductData.findByIdAndDelete(req.params.id);
      if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {getProducts,getProductById,createProduct,getTotalPrice,updateProduct,deleteProduct}