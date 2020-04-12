const mysql = require('mysql-promise');
const conf = require('./conf')

const db = mysql()

db.configure(conf);

module.exports = {db}

