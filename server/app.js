const express = require('express');
const mongoose = require("mongoose")
const cors = require('cors');
const dotenv = require('dotenv')

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const book = require('./routes/bookRoute')
const user = require('./routes/userRoute')
const errorMiddleware = require('./middleware/error')
const fileUpload = require('express-fileupload')
const path = require('path')



dotenv.config({path:"./config/config.env"})

const app = express();




require('./db/conn')


app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())


app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())

app.use('/api/soummya',book)
app.use('/api/soummya',user)

// error middleware

app.use(errorMiddleware)



module.exports = app