const app = require('./app');
const dotenv = require('dotenv')

const cloudinary = require('cloudinary')


dotenv.config({path:"./config/config.env"})

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is running at port ${process.env.PORT}`)
})






//unhandle error handle of mongoDb//

process.on('uncaughtException',(err)=>{
    console.error(`Error:${err.message}`)
    console.log("Shutting down the server due to unhandle promise rejection")

    server.close(()=>{
        process.exit(1)
    })
})


