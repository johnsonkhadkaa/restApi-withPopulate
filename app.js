const express = require('express')
const morgan = require('morgan')
const app = express()
require('dotenv').config()
const bodyParser = require('body-parser')
const productRoutes = require('./api/routes/products.js')
const orderRoutes = require('./api/routes/orders')
const userRoutes = require('./api/routes/user')



// middlewares
app.use(morgan('dev'))
//making uploads folder globally available using express.static() method
app.use('/api/uploads' , express.static('uploads')) 
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(bodyParser.raw())

// route middleware
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/user', userRoutes)


// server start & db connection function
//   in server.js file


// error handling middleware
app.use((req,res,next)=>{
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error : {
            message : error.message
        }
    })
})


module.exports = app 