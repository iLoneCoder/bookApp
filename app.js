const express = require('express')
const path = require('path')
require('dotenv').config()

const bookRoute = require('./routes/books')

const app = express()
const PORT = 3000 || process.env.PORT


app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.set('views', path.join(__dirname, 'views')),
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', bookRoute)



app.listen(PORT, () => console.log(`app listenes port ${PORT}`))