const { Book } = require('../models');

async function getBooks(userEmail) {
    const books = await Book.findAll({ where: { userEmail }});

    return books;
}

async function getBook(bookId, userEmail) {
    const book = await Book.findOne({ where: { id: bookId, userEmail }});

    return book;
}

async function getFinishedBooks(userEmail) {
    const finishedBooks = await Book.findAll({ where: { finished: true, userEmail }});

    return finishedBooks;
}

async function getNotFinishedBooks(userEmail) {
    const notFinishedBooks = await Book.findAll({ where: { finished: false, userEmail }});

    return notFinishedBooks;
}

async function createBookregister(book) {

    const newBook = await Book.create(book);
    console.log(newBook.createdAt)

    return newBook;
}

async function editBookregister(userEmail, lastPage, finished, bookId, totalDays, pagesPerDay) {
    const book = await Book.findOne({ where: { id: bookId, userEmail }});

    book.lastPage = lastPage
    book.finished = finished
    book.totalDays = totalDays
    book.pagesPerDay = pagesPerDay;

    const bookEdited = await book.save();

    return bookEdited;
}

async function deleteBookRegister(userEmail, bookId) {
    const bookRemoved = await Book.findOne({ where: { id: bookId, userEmail }});

    await bookRemoved.destroy();

    return bookRemoved;
}

module.exports = {
    getBooks,
    getBook,
    getFinishedBooks,
    getNotFinishedBooks,
    createBookregister,
    editBookregister,
    deleteBookRegister,
}