const express = require('express')
const route = express.Router()
const { getBooks, createBook, updateBook } = require('../controllers/books')

route.get('/', getBooks)
route.post('/', createBook)
route.post('/:bookId', updateBook)

module.exports = route