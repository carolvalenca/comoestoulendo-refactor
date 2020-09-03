const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')

const app = express()

mongoose.connect("mongodb+srv://carol:carol123@cluster0.i4inp.mongodb.net/celdb?retryWrites=true&w=majority")

app.use(express.json())
app.use(routes)

app.listen(8080)