const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/check-auth')
const ProductControllers = require('../controllers/products')

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
  
const  fileFilter = (req, file, cb)=> {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({ 
    storage: storage ,
    limits : {
       fileSize : 1024*1024*5
    },
    fileFilter : fileFilter
});


// GET method to get all products
router.get("/", ProductControllers.products_get_all_products)

// POST method to create product
router.post("/" ,checkAuth,upload.single('productImage'),ProductControllers.products_create_product)

// GET method to get individual product
router.get("/:productId" ,checkAuth, ProductControllers.products_get_product)

// PATCH method to update product
router.patch('/:productID',checkAuth, ProductControllers.products_update_product);
  

// DELETE method to delete product
router.delete("/:productId" ,checkAuth, ProductControllers.products_delete_product)

module.exports = router


// router.patch("/:productId" , (req,res)=>{
//     const id = req.params.productId
//     const updatedData = req.body  
//     Product.findById(id , (err, product) => {
//       if (err) {
//         return res.status(500).json({error: 'Error while finding the product'});
//       }
  
//       if (!product) {
//         return res.status(404).json({error: 'Product not found'});
//       }
      
//       product.name = updatedData.name
//       product.price = updatedData.price

//       product.save()
//       res.json(product);
//     })
// })

