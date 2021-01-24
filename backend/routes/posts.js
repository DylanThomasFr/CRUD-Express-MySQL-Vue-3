const express = require('express')
const router = express.Router()
const db = require('../config/database')
const Post = require('../models/Post')

router.get('/', (request, response) =>
    Post.findAll()
        .then(posts => response.send(200))
        .catch(error => console.log(error))
)

module.exports = router