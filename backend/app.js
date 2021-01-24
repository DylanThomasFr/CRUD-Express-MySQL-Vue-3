const express = require('express')
const { sequelize, User } = require('./models')

const app = express()
app.use(express.json())

app.post('/users', async(request, response) => {
    const {username, password, email, firstName, lastName, role} = request.body

    try {
        const user = await User.create({username, password, email, firstName, lastName, role})

        return response.json(user)
    } catch(err) {
        console.log(err)
        return response.status(500).json(err)
    }
})

app.listen({ port : 3000 }, async () => {
    console.log('Server up !')
    await sequelize.authenticate();
    console.log('Database connected !')
})
