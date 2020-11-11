const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

mongoose.connect(process.env.DB_URL,
    { useNewUrlParser: true },
    { useUnifiedTopology: true });

app.use(express.json());
app.use(routes);

app.listen(8080);