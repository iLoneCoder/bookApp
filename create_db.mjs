import pg from 'pg'

const client = new pg.Client({
    host: 'localhost',
    user: 'postgres',
    password: 'password',
    port: '5432'
})

client.connect().then(() => {
    client
        .query('CREATE DATABASE "bookbase"')
        .then(() => {
            console.log('Finished creating database')
            client.end()
        })
        .catch((err) => {
            console.log(err.message)
            client.end()
        })
})