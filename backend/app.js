const express = require('express')
const { sequelize, User } = require('./api/models')
const bodyParser = require ('body-parser');


const app = express()
app.use(express.json())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.port || 3000

app.listen(port, async () => {
    console.log('Server up !')
    await sequelize.authenticate();
    console.log('Database connected !')
})
