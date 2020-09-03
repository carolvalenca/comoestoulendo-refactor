const express = require('express')
const routes = express.Router()

const BooksController = require('./controllers/BooksController')

routes.get('/finishedBooks', BooksController.indexFinished)
routes.get('/notFinishedBooks', BooksController.indexNotFinished)

routes.post('/createBook', BooksController.create)
routes.put('/editBook', BooksController.edit)

module.exports = routes