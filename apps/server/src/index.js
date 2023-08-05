
const express = require('express')

const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()

const db = require('./lib/sqlite')

db.serialize(() => {
    db.all("select name from sqlite_master where type='table'", function (err, tables) {
        console.log(tables);
        if (tables.length == 0) {
            db.serialize(() => {
                db.run(`
                create table link
                (
                    slug        text primary key,
                    destination text not null,
                    created_at  timestamp,  
                    hits        integer   default 0
                );
                            `, (err) => {
                    if (err) {
                        console.log(err.message);
                    }
                }
                )
            })
        }
    });
});

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())


app.use('/', require('./routes'))



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})