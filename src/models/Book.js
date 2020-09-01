const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: {
        type: String
    },
    author: {
        type: String
    },
    startDate: {
        type: Date
    },
    finishDate: {
        type: Date
    },
    lastPage: {
        type: Number
    },
    pagesPerDay: {
        type: Number
    }
})

module.exports = mongoose.model('Book', bookSchema)