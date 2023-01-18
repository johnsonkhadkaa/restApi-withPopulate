const express = require('express');
const mongoose = require('mongoose');

const app = express();
// const uri = "mongodb+srv://test:test@cluster0.nn6ir.mongodb.net/acamind_restapi"


mongoose.set('strictQuery', false)

// mongoose connection
const connectDB = (uri) => {
    // console.log('connect')
    return mongoose.connect(uri , {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    } ,(req , res)=>{
      console.log('DB connection successful!')
    })
}

module.exports = connectDB


// const mongoose = require('mongoose')
// const express = require('express')

// mongoose.set("strictQuery", false)

// mongoose.connect(
//     "mongodb+srv://test:test@cluster0.nn6ir.mongodb.net/test",
//     {
//         useNewUrlParser : true,
//         useUnifiedTopology : true
            
//     }
//   ).then(()=>{
//     console.log('Connection Successful')
//   })
//   .catch((err)=>{
//     console.log('No connection')
//   });