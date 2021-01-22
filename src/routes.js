const routes = require('express').Router();

const BookController = require('./controllers/book.controller');
const SessionController = require('./controllers/session.controller');

const verifyToken = require('./middlewares/verify-token');
const { registerValidator, loginValidator } = require('./middlewares/session-validator')

routes.post('/signup', registerValidator, SessionController.signUp);
routes.post('/signin', loginValidator, SessionController.signIn);

routes.get('/books/all', BookController.getAllBooks);
routes.get('/books/finished', BookController.getFinishedBooks);
routes.get('/books/notfinished', BookController.getNotFinishedBooks);

routes.post('/books/create', BookController.createBookRegister);
routes.put('/books/edit', BookController.editBookRegister);
routes.delete('/books/delete/:id', BookController.deleteBookRegister);

module.exports = routes;