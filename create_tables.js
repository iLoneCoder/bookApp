const sequelize = require('./db/sequelize')
require('./db')

async function createTables() {
    await sequelize.sync({force: true})
}

createTables()