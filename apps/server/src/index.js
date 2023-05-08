
const express = require('express')

const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.json())


app.use('/', require('./routes'))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})