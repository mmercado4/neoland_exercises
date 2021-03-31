const mysql = require("mysql");
const DBPASS = "MItpkjwb9";

function dbInit() {
  const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: DBPASS,
    database: "pokeapi",
  });

  db.connect((error) => {
    if (error) throw error;
    console.log("DB Connected");
  });

  return db;
}

module.exports = {
  dbInit: dbInit,
};
