const mysql = require('mysql2');

const connectiond = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    port: 3306,
    database: 'musicstore'
});

module.exports = {
    connectiond
}