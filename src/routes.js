const express = require('express');
const routes = express.Router();

const BookController = require('./controllers/book.controller');
const RegisterLoginController = require('./controllers/register-login.controller');

const verifyToken = require('./middlewares/verify-token');

routes.post('/register', RegisterLoginController.register);
routes.post('/login', RegisterLoginController.login);

routes.get('/books/all', BookController.getAllBooks);
routes.get('/books/finished', BookController.getFinishedBooks);
routes.get('/books/notfinished', BookController.getNotFinishedBooks);

routes.post('/books/create', BookController.createBookRegister);
routes.put('/books/edit', BookController.editBookRegister);

module.exports = routes;