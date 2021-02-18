const {Post, User} = require('../models');
const { addPostValidation } = require('../validation/postValidation')
const {Op} = require("sequelize");
const {getUserId} = require('../../utils/jwtTokenUtils')

exports.addPost = async (request, response) => {

    // Validation of datas
    const { error } = addPostValidation(request.body)
    if (error) return response.status(422).send(error.details[0].message)

    let userId = getUserId(request.headers.authorization)

    const user = await User.findOne({
        where: {
            id: userId
        }
    })

    if (user.role === 1) {
        const post = new Post({
            title: request.body.title,
            content: request.body.content,
            author: user.id
        })

        try {
            const savedPost = await post.save()
            response.status(201).json(savedPost)
        } catch (error) {
            response.status(400).json({ error: error.details[0].message })
        }
    } else {
        response.status(401).send({ error: 'You don\'t have the right to create a new post' })
    }
};

exports.allPosts = async (request, response) => {
    try {
        let userId = getUserId(request.headers.authorization)
        const posts = await Post.findAll( {
            where :{
                author: userId
            }
        })
        response.status(200).json(posts)
    } catch (error) {
        response.status(400).json({ error: error.details[0].message })
    }
};

exports.getPost = async (request, response) => {
    let userId = getUserId(request.headers.authorization)
    console.log(userId)
    try {
        const post = await Post.findOne({
            where: {
                [Op.and] : [
                    {author: userId},
                    {id : request.params.postId}
                ]
            }
        })
        response.status(200).json(post)
    } catch (error) {
        response.status(400).json({ error: error.details[0].message })
    }
};

exports.updatePost = async (request, response) => {

};

exports.deletePost = async (request, response) => {

};