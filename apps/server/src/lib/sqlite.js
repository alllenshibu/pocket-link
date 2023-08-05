const sqlite3 = require('sqlite3').verbose()
require('dotenv').config()

const db = new sqlite3.Database(process.env.SQLITE_DATABASE_NAME, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the pocket link database');
});



module.exports = db;