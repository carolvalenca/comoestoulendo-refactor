const BookService = require('../services/book.service');
const { getDaysDifference } = require('../utils/time_calc');

async function getAllBooks(req, res) {
    try {
        const { id } = req.user;
        const books = await BookService.getBooks(id);

        return res.status(200).json(books);
    } catch (err) {
        res.send(err);
    }
}

async function getFinishedBooks(req, res) {
    try {
        const { id } = req.user;
        const books = await BookService.getFinishedBooks(id);

        return res.json(books);
    } catch (err) {
        res.send(err);
    }
}

async function getNotFinishedBooks(req, res) {
    try {
        const { id } = req.user;
        const books = await BookService.getNotFinishedBooks(id);

        return res.json(books);
    } catch (err) {
        res.send(err);
    }
}

async function createBookRegister(req, res) {
    try {
        const { id } = req.user;
        const { name, author, cover, pages } = req.body;

        const book = {
            userEmail: id,
            name,
            author,
            cover,
            pages,
            lastPage: 0,
            pagesPerDay: 0,
            totalDaysReading: 1,
            finished: false
        }

        const newBook = await BookService.createBookregister(book);

        return res.json(newBook);
    } catch(err) {
        console.log(err)
        return res.status(400).json({err});
    }
}

async function editBookRegister(req, res) {
    try {
        const { id } = req.user;
        const { lastPage, finished, bookId } = req.body;

        const book = await BookService.getBook(bookId, id);

        let lastPageRead = lastPage

        if (finished) lastPageRead = book.pages

        if (lastPage < book.lastPage) return res.status(400).json({message: "ultima pagina lida nao pode ser menor que ultima pagina registrada"});
        else if (lastPage > book.pages) return res.status(400).json({message: "ultima pagina lida nao pode ser maior que total de paginas"});
        
        let totalDays = getDaysDifference((book.createdAt + ""), new Date());

        //adicionando o dia em que o livro foi registrado pois ele conta como 0
        totalDays = totalDays + 1;

        const bookEdited = await BookService.editBookregister(id, lastPageRead, finished, bookId, totalDays);

        return res.json(bookEdited);
    } catch(err) {
        console.log(err)
        return res.status(400).json({err});
    }
}

async function deleteBookRegister(req, res) {
    try {
        const { id } = req.user;
        const { bookId } = req.params;

        const deletedBook = await BookService.deleteBookRegister(id, bookId);

        return res.json(deletedBook);
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