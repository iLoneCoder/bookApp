const express = require('express')
const route = express.Router()
const { getBooks, getBookForm, updateBook, getCreateBook, postCreateBook } = require('../controllers/books')

route.get('/', getBooks)
route.get('/edit/:bookId', getBookForm)
route.post('/edit/:bookId', updateBook )
route.get('/create', getCreateBook)
route.post('/create', postCreateBook)

module.exports = route