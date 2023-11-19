const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    class Book extends Model {}

    Book.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        publicationDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        isbnNumber: {
            type: DataTypes.STRING(13),
            allowNull:false,
            field: "isbn_number"
        },
        numberOfPages: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'number_of_pages'
        },
        publicationLanguage: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'publication_language'
        },
        // authorId: {
        //     type: DataTypes.INTEGER,
        //     field: 'author_id',
        //     allowNull: false
        // }
    }, {
        sequelize,
        modelName: 'Book',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })

    return Book
} 