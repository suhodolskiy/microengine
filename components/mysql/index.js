const mysql = require('mysql');
const config = require('config');

const connection = mysql.createConnection(config.get('mysql'));
connection.connect();

module.exports = connection;