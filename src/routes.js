const routes = require('express').Router();

const BookController = require('./app/controllers/book.controller');
const SessionController = require('./app/controllers/session.controller');

const verifyToken = require('./app/middlewares/verify-token');
const { registerValidator, loginValidator } = require('./app/middlewares/session-validator')

routes.post('/signup', registerValidator, SessionController.signUp);
routes.post('/signin', loginValidator, SessionController.signIn);

routes.get('/books/all', verifyToken, BookController.getAllBooks);
routes.get('/books/finished', verifyToken, BookController.getFinishedBooks);
routes.get('/books/notfinished', verifyToken, BookController.getNotFinishedBooks);

routes.post('/books/create', verifyToken, BookController.createBookRegister);
routes.put('/books/edit', verifyToken, BookController.editBookRegister);
routes.delete('/books/delete/:bookId', verifyToken, BookController.deleteBookRegister);

module.exports = routes;