const express = require('express')
const router = express.Router()
const db = require('../config/database')
const User = require('../models/User')

router.get('/', (request, response) =>
    User.findAll()
        .then(users => response.send(200))
        .catch(error => console.log(error))
)

module.exports = router