const { Model, DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    class Author extends Model {}

    Author.init({
        id: {
            type:DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Author',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })

    return Author
}