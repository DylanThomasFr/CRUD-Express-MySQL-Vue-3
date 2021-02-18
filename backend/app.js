const express = require('express')
const { sequelize, User } = require('./api/models')
const bodyParser = require ('body-parser')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')


const app = express()
app.use(express.json())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/user', authRoute)
app.use('/api/post', postRoute)

const port = process.env.port || 3000

app.listen(port, async () => {
    console.log('Server up !')
    await sequelize.authenticate();
    console.log('Database connected !')
})
