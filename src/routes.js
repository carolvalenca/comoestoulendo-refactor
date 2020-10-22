const express = require('express')
const routes = express.Router()

const BookController = require('./controllers/book.controller')

routes.get('/books/finished', BookController.getFinishedBooks)
routes.get('/books/notfinished', BookController.getNotFinishedBooks)

routes.post('/books/create', BookController.createBookRegister)
routes.put('/books/edit', BookController.editBookRegister)

module.exports = routes