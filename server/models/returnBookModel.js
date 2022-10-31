const mongoose = require('mongoose')

const returnBookSchema = new mongoose.Schema({

    bookname: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },

    bookId:{
        type: String,
        required: true
    },
    request:{
        type: String
    },
    isreturn:{
        type:String
    },
    returnDate: {
        type: Date
    },
    

})

module.exports = mongoose.model('ReturnBooks', returnBookSchema)