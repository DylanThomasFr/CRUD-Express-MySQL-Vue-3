const express = require('express')
const router = express.Router()
const verify = require('../api/middleware/checkToken')
const {allPosts, addPost, getPost, deletePost, updatePost} = require('../api/controllers/postController')


// GET ALL THE POSTS
router.get('/', verify, allPosts)

// SUBMIT A POST
router.post('/', verify, addPost)

//SPECIFIC POST
router.get('/:postId', verify, getPost)

//DELETE A POST
router.delete('/:postId', verify, deletePost)

//UPDATE A POST
router.put('/:postId', verify, updatePost)

module.exports = router