const { Client } = require('pg')

const client = new Client({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port_db
});

client.connect((error) => {
    if(error) {
        throw error
    }
    console.log('Connect to postgreSQL')
});

module.exports = client;