const { Op, where } = require('sequelize')
const { Book, Author } = require('../db')
const { dateToString } = require('../utils/utilFunctions')


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

    res.render('index', {books, title, author, language, from, to})
}

module.exports.getBookForm = async (req, res) => {
    const { bookId } = req.params

    const book = await Book.findByPk(bookId, {include: {model: Author}})
    
    const date = dateToString(book.publicationDate)

    res.render('book', {
        id: book.id,
        title: book.title,
        author: book.Author.name,
        publicationDate: date,
        isbnNumber: book.isbnNumber, 
        numberOfPages: book.numberOfPages,
        publicationLanguage: book.publicationLanguage,
        errorMessage: {},
        success: false
    })
}

module.exports.updateBook = async (req, res) => {
    const id = req.params.bookId
    const {
        title,
        author, 
        publicationDate, 
        isbnNumber,
        numberOfPages,
        publicationLanguage
    } = req.body

    const errorMessage = {
        titleError: !title ? true : false,
        authorError: !author ? true : false,
        publicationDateError: !publicationDate ? true : false,
        isbnNumberError: !isbnNumber ? true : false,
        numberOfPagesError: !numberOfPages ? true : false,
        publicationLanguage: !publicationLanguage ? true : false
    }

    if(!id) {
        res.render('index')
        return
    }

    if(errorMessage.titleError || errorMessage.authorError || errorMessage.publicationDateError ||
        errorMessage.isbnNumberError || errorMessage.numberOfPagesError || errorMessage.publicationLanguage) {
            res.render('book', {
                id, 
                title, 
                author, 
                publicationDate, 
                isbnNumber, 
                numberOfPages, 
                publicationLanguage, 
                errorMessage,
                success: false
            })
            return
        }


    let authorInst = await Author.findOne({where: {name: author}})
    if(!authorInst) {
        authorInst = await Author.create({
            name: author
        })
    }
    
    const book = await Book.findByPk(id)
    await book.update({
        title,
        AuthorId: authorInst.id,
        publicationDate: new Date(publicationDate),
        isbnNumber: isbnNumber,
        numberOfPages: numberOfPages,
        publicationLanguage: publicationLanguage
    })
    const updatedBook = await Book.findByPk(id, { include: { model: Author } })

    const date = dateToString(updatedBook.publicationDate)
    // console.log(updatedBook.publicationDate, 'publicationDate', date)
    res.render('book', {
        id,
        title: updatedBook.title,
        author: updatedBook.Author.name,
        publicationDate: date,
        isbnNumber: updatedBook.isbnNumber, 
        numberOfPages: updatedBook.numberOfPages,
        publicationLanguage: updatedBook.publicationLanguage,
        errorMessage: {},
        success: true
    })

    // res.json({msg: 'hh'})
}

module.exports.getCreateBook = async (req, res) => {
    res.render('createBook', {
        id:"",
        title:"",
        author:"",
        publicationDate: "",
        isbnNumber: "", 
        numberOfPages: "",
        publicationLanguage: "",
        errorMessage: {},
        success: false
    })
}

module.exports.postCreateBook = async (req, res) => {
    const {
        title,
        author, 
        publicationDate, 
        isbnNumber,
        numberOfPages,
        publicationLanguage
    } = req.body

    const errorMessage = {
        titleError: !title ? true : false,
        authorError: !author ? true : false,
        publicationDateError: !publicationDate ? true : false,
        isbnNumberError: !isbnNumber ? true : false,
        numberOfPagesError: !numberOfPages ? true : false,
        publicationLanguage: !publicationLanguage ? true : false
    }

    if(errorMessage.titleError || errorMessage.authorError || errorMessage.publicationDateError ||
        errorMessage.isbnNumberError || errorMessage.numberOfPagesError || errorMessage.publicationLanguage) {
            res.render('createBook', {
                title, 
                author, 
                publicationDate, 
                isbnNumber, 
                numberOfPages, 
                publicationLanguage, 
                errorMessage,
                success: false
            })
            return
        }

    let authorInst = await Author.findOne({where: {name: author}})
    if (!authorInst) {
        authorInst = await Author.create({
            name: author
        })
    }

    await Book.create({
        title: title,
        AuthorId: authorInst.id,
        publicationDate: new Date(publicationDate),
        isbnNumber: isbnNumber,
        numberOfPages: numberOfPages,
        publicationLanguage: publicationLanguage
    })

    
    const books = await Book.findAll({include: {model: Author}})

    res.render('index', { books, title:"", author:"", language:"", from:"", to:"" })
}
