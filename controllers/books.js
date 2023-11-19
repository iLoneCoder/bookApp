const { Op } = require('sequelize')
const { Book, Author } = require('../db')

module.exports.getBooks = async (req, res) => {
    const {title, author, language, from, to} = req.query

    const whereClause = {}
    if(title) {
        whereClause.title = title
    } 

    if(author) {
        whereClause.author = author
    }

    if(language) {
        whereClause.publicationLanguage = language
    }

    if (from) {
        whereClause.publicationDate = {
            [Op.gt]: from
        }
    }

    if (to) {
        whereClause.publicationDate = {
            [Op.lt]: to
        }
    }

    if(from && to) {
        whereClause.publicationDate = {
            [Op.and]: {
                [Op.gt]: from,
                [Op.lt]: to
            }
        }
    }


    const books = await Book.findAll({
        where: whereClause,
        include: {
            model: Author
        }
    })
    console.log(books[0].publicationDate) 
    res.render('index', {books, title, author, language, from, to})
}

module.exports.updateBook = (req, res) => {
    
}

module.exports.createBook = async (req, res) => {
    const book = await Book.create({
        title: 'Danashauli da sasjeli',
        publicationDate: new Date('1988-04-04'),
        isbnNumber: '123543',
        numberOfPages: '456',
        publicationLanguage: 'English',
        AuthorId: 1    
    })

    res.json({book})
}
