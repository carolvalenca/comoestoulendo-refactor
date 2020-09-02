const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name: {
        type: String
    },
    author: {
        type: String
    },
    bookCover: {
        type: String
    },
    bookPages: {
        type: Number
    },
    startDate: {
        type: Date
    },
    lastDate: {
        type: Date
    },
    lastPage: {
        type: Number
    },
    pagesPerDay: {
        type: Number
    },
    totalDays: {
        type: Number
    },
    finished: {
        type: Boolean
    }
})

module.exports = mongoose.model('Book', bookSchema)