const mongoose = require('mongoose')

const bookSchena = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    issued:{
        type:Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Books', bookSchena)