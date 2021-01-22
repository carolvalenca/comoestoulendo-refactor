const BookService = require('../services/book.service');
const { getDaysDifference } = require('../utils/time_calc');

async function getAllBooks(_, res) {
    try {
        const books = await BookService.getBooks();

        return res.status(200).json(books);
    } catch (err) {
        res.send(err);
    }
}

async function getFinishedBooks(_, res) {
    try {
        const books = await BookService.getFinishedBooks();

        return res.json(books);
    } catch (err) {
        res.send(err);
    }
}

async function getNotFinishedBooks(_, res) {
    try {
        const books = await BookService.getNotFinishedBooks();

        return res.json(books);
    } catch (err) {
        res.send(err);
    }
}

async function createBookRegister(req, res) {
    try {
        const { name, author, cover, pages } = req.body;
    
        const newBook = await BookService.createBookregister(name, author, cover, pages);

        return res.json(newBook);
    } catch(err) {
        return res.status(400).json({err});
    }
}

async function editBookRegister(req, res) {
    try {
        const { lastPage, finished, bookId } = req.body;

        const book = await BookService.getBook(bookId);
        
        lastDate = lastDate + "";
        lastDate = lastDate.split(' (');
        
        let totalDays = getDaysDifference(book.startDate, lastDate[0]);

        //adicionando o dia em que o livro foi registrado pois ele conta como 0
        totalDays = totalDays + 1;

        const bookEdited = await BookService.editBookregister(lastPage, finished, bookId, totalDays);

        return res.json(bookEdited);
    } catch(err) {
        console.log(err)
        return res.status(400).json({err});
    }
}

async function deleteBookRegister(req, res) {
    try {
        const { id } = req.params;

        await BookService.deleteBookRegister(id);

        const books = BookService.getBooks();

        return res.json(books);
    } catch (err) {
        console.log(err)
        return res.status(400).json({err});
    }
}

module.exports = {
    getAllBooks,
    getFinishedBooks,
    getNotFinishedBooks,
    createBookRegister,
    editBookRegister,
    deleteBookRegister,
}