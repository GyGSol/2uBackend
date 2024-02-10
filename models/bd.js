var mysql = require("mysql2/promise");
var util = require("util");

var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'gonza1123',
  database: process.env.MYSQL_DB_NAME || 'db_2uapp',
  port: process.env.MYSQL_PORT || 3306
});

pool.query = util.promisify(pool.query);
module.exports = pool;
