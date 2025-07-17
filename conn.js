const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLNAME
});

db.connect((err) => {
    if (err){
        console.error('Koneksi kedalam database tidak berhasil', err.message);
    }else{
        console.log('Koneksi kedalam database berhasil');
    };
});

module.exports = db