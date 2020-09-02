const Book = require('../models/Book')

function getDaysDifference(lastDate, dateNow){
    const lastDateTimeStamp = lastDate.getTime();
    const nowTimeStamp = dateNow.getTime();

    const microSecondsDiff = Math.abs(lastDateTimeStamp - nowTimeStamp );
    const daysDiff = Math.floor(microSecondsDiff/(1000 * 60 * 60  * 24));

    return daysDiff
}

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
        const { name, author, bookCover, bookPages } = req.body
        const startDate = new Date()

        const book = new Book({
            name,
            author,
            bookCover,
            bookPages,
            startDate,
            lastPage: 0,
            finished: false
        })

        try {
            const newBook = await book.save()
            return res.json(newBook)
        } catch(err) {
            return res.status(400).json({err})
        }
    },

    async edit(req, res) {
        const { lastPage, finished, bookId } = req.body

        const book = Book.findOne({_id: bookId})
        const lastDate = new Date()

        const totalDays = getDaysDifference(book.startDate, lastDate)

        book.lastPage = lastPage
        book.finished = finished
        book.lastDate = lastDate
        book.totalDays = totalDays
        book.pagesPerDay = (lastPage/totalDays)

        try {
            const bookEdited = await book.save()
            return res.json(bookEdited)
        } catch(err) {
            return res.status(400).json({err})
        }
    },
}