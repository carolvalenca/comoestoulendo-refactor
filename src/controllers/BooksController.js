const Book = require('../models/Book')

function getDaysDifference(lastDate, dateNow){
    const lastDateTimeStamp = (new Date(lastDate)).getTime();
    const nowTimeStamp = (new Date(dateNow)).getTime();

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
        let startDate = new Date()

        startDate = startDate + ""
        startDate = startDate.split(' (')

        const book = new Book({
            name,
            author,
            bookCover,
            bookPages,
            startDate: startDate[0],
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

        const book = await Book.findOne({_id: bookId})
        let lastDate = new Date()
        
        lastDate = lastDate + ""
        lastDate = lastDate.split(' (')
        
        let totalDays = getDaysDifference(book.startDate, lastDate[0])

        //adicionando o dia em que o livro foi registrado pois ele conta como 0
        totalDays = totalDays + 1

        book.lastPage = lastPage
        book.finished = finished
        book.lastDate = lastDate[0]
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