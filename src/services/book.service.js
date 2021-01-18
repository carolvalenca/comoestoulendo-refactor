const Book = require('../models/Book');

async function getBooks() {
    const books = await Book.find({});

    return books;
}

async function getBook(bookId) {
    const book = await Book.findOne({_id: bookId});

    return book;
}

async function getFinishedBooks() {
    const finishedBooks = await Book.find({finished: true});

    return finishedBooks;
}

async function getNotFinishedBooks() {
    const notFinishedBooks = await Book.find({finished: false});

    return notFinishedBooks;
}

async function createBookregister(name, author, bookCover, bookPages, startDate) {
    const book = new Book({
        name,
        author,
        bookCover,
        bookPages,
        startDate,
        lastPage: 0,
        pagesPerDay: 0,
        finished: false
    });

    const newBook = await book.save();

    return newBook;
}

async function editBookregister(lastPage, finished, bookId, lastDate, totalDays) {
    const book = await Book.findOne({_id: bookId});

    book.lastPage = lastPage
    book.finished = finished
    book.lastDate = lastDate
    book.totalDays = totalDays
    book.pagesPerDay = (lastPage/totalDays);

    const bookEdited = await book.save();

    return bookEdited;
}

async function deleteBookRegister(bookId) {
    const bookRemoved = await Book.remove({_id: bookId});

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