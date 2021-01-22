const { factory } = require('factory-girl');
const { User, Book } = require('../src/app/models');

factory.define('User', User, {
    name: "Caroliny",
    email: "carol@hotmail.com",
    password: "123456"
});

factory.define('Book', Book, {
    userEmail: "carol@hotmail.com",
    name: "Harry Potter e a Pedra filosoal",
    author: "J. K. Rowling",
    cover: "http://bookcover.com.br",
    pages: 250,
    lastPage: 5,
    pagesPerDay: 5,
    totalDaysReading: 1
});

module.exports = factory;