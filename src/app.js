require('dotenv').config({
    path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
});

const express = require('express');
const routes = require('./routes');
const cors = require('cors');

class AppController {
    constructor() {
        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
        this.express.use(cors());

    }

    routes() {
        this.express.use(routes);
    }
}

module.exports = new AppController().express;
