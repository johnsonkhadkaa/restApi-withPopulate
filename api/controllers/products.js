const Product = require('../models/products')
const mongoose = require('mongoose')

exports.products_get_all_products = (req , res)=>{
    Product.find()
    .select('name price _id productImage')
    // .sort({price : -1})
    .exec()
    .then(docs => {
        const response = {
            count : docs.length,
            products : docs.map(doc => {
                return{
                    name : doc.name,
                    price : doc.price,
                    productImage : doc.productImage,
                    _id : doc._id,
                    request : {
                        type : 'GET' ,
                        url : 'http://localhost:4500/api/products/'+ doc._id
                    }
                }
            })
        }
        res.status(200).json(response)
    })
    .catch(err =>{
        res.status(500).json({
        error : err
        })
    })
}


exports.products_create_product = (req , res ,next)=>{
    console.log(req.file)
    const product = new Product ({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name ,
        price : req.body.price,
        productImage : '/api/' +req.file.path
    })
    product.save()
    .then(result => {
        console.log(result)
        res.status(201).json({
            message : 'Created Products Successfully',
            product : result
        })
    }).catch(err => {
        res.send(err)
        console.log(err)
    })
}

exports.products_get_product = (req , res)=>{
    const id = req.params.productId
    console.log(req.params)
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc)
        res.status(200).json(doc)
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({
            error : err
        })
    })
 }

 exports.products_update_product = (req, res) => {
    const id = req.params.productId;
    // console.log(id)
    const updatedData = req.body;
    console.log(updatedData.name)
    console.log(updatedData.price)
  
    // Validate the input data
    // if (!updatedData.name || !updatedData.price) {
    //   return res.status(400).json({error: 'Invalid data'});
    // }
  
    // Find the product in the database
    Product.findById(id, (err, product) => {
      if (err) {
        return res.status(500).json({error: 'Error while finding the product'});
      }
  
      if (!product) {
        return res.status(404).json({error: 'Product not found'});
      }
  
      // Update the product
      product.name = updatedData.name;
      product.price = updatedData.price;
  
      product.save((saveErr) => {
        if (saveErr) {
          return res.status(500).json({error: 'Error while updating the product'});
        }
        console.log(product)
        res.json(product);
      });
    });
  }

  exports.products_delete_product = (req , res)=>{
    const id = req.params.productId
    console.log(req.params)
    Product.remove({_id : id})
    .exec()
    .then(doc =>{
        console.log('Removed from the table.')
        res.status(200).json(doc)
    })
    .catch(err =>{
        res.status(500).json({
            error : err
        })
    })
}