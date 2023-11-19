const sequelize = require('./sequelize')
const authors = require('./models/authors')
const books = require('./models/books')

const Author = authors(sequelize)
const Book = books(sequelize)

Author.hasMany(Book, {foreignKey: 'AuthorId'})
Book.belongsTo(Author)

module.exports = {
    Author,
    Book
}