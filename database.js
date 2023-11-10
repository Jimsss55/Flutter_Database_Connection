const { createPool } = require("mysql");

const pool = createPool({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "Password123#@!",
  database: "SPIMS_Database",
});

module.exports = pool;
