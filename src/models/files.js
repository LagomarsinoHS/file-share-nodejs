const mongoose = require('mongoose')

const Files = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    originalName: {
        type: String,
        required: true
    },
    originalPassword: {
        type: String
    },
    password: {
        type: String
    },
    downloadCount: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('Files', Files);