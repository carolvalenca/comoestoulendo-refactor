// const Book = require('../models/Book');
const Book = require('../app/models/Book');

async function getBooks() {
    const books = await Book.findAll({});

    return books;
}

async function getBook(bookId) {
    const book = await Book.findOne({ where: { id: bookId }});

    return book;
}

async function getFinishedBooks() {
    const finishedBooks = await Book.findAll({ where: { finished: true }});

    return finishedBooks;
}

async function getNotFinishedBooks() {
    const notFinishedBooks = await Book.findAll({ where: { finished: false }});

    return notFinishedBooks;
}

async function createBookregister(name, author, cover, pages) {
    const newBook = await Book.create({
        name,
        author,
        cover,
        pages,
        lastPage: 0,
        pagesPerDay: 0,
        totalDaysReading: 1,
        finished: false
    });

    return newBook;
}

async function editBookregister(lastPage, finished, bookId, totalDays, pagesPerDay) {
    const book = await Book.findOne({ where: { id: bookId }});

    book.lastPage = lastPage
    book.finished = finished
    book.totalDays = totalDays
    book.pagesPerDay = pagesPerDay;

    const bookEdited = await book.save();

    return bookEdited;
}

async function deleteBookRegister(bookId) {
    const bookRemoved = await Book.findOne({ where: { id: bookId }});

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