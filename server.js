const app = require('./app')
require('dotenv').config()
const connectDB = require('./db/connect')
const port = process.env.PORT || 4500;

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server is running at ${port}`)
          })
    }catch(error){
         console.log(error)
       }
    }
start()

// const server = http.createServer(app);

// server.listen(port , (req,res)=>{
//     console.log('Server is running at port ' + port)
// });

