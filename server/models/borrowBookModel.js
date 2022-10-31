const mongoose = require('mongoose')

const borrowSchema = new mongoose.Schema({

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
    borroewdAt: {
        type: Date,
        default: Date.now
    },
    dueDate:{
        type:Date
    }

})

module.exports = mongoose.model('RequestToBorrow', borrowSchema)