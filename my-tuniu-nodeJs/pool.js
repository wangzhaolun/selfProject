/**
 * Created by lb on 2017/6/30.
 */
const mysql = require('mysql');

module.exports = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'tuniu',
    port: 3306,
    connectionLimit: 5
});