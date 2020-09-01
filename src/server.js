const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use(routes)

app.listen(8080)