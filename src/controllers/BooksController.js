const Book = require('../models/Book')

//quantidade de dias entre duas datas distintas
// var dateFromAPI = "2016-02-10T00:00:00Z";
// var now = new Date();
// var datefromAPITimeStamp = (new Date(dateFromAPI)).getTime();
// var nowTimeStamp = now.getTime();

// var microSecondsDiff = Math.abs(datefromAPITimeStamp - nowTimeStamp );
// var daysDiff = Math.floor(microSecondsDiff/(1000 * 60 * 60  * 24));

module.exports = {
    async indexFinished(req, res) {
        const books = await Book.find({finished: true})

        return res.json(books)
    },

    async indexNotFinished(req, res) {
        const books = await Book.find({finished: false})

        return res.json(books)
    },

    async create(req, res) {
        const { name, author, bookCover }
        const startDate = new Date()

        const book = new Book({
            name,
            author,
            bookCover,
            startDate,
            lastPage: 0,
        })

        try {
            const newBook = await book.save()
            return res.json(newBook)
        } catch(err) {
            return res.status(400).json({err})
        }
    },
}