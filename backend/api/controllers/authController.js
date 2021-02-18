const bcrypt = require('bcryptjs');
const {User} = require('../models');
const {registerValidation, loginValidation} = require('../validation/userValidation')
const jwtTokenUtils = require('../../utils/jwtTokenUtils');
const {Op} = require("sequelize");


exports.register = async (request, response) => {

    const {error} = registerValidation(request.body)
    if(error) return response.status(422).send(error.details[0].message)

    const salt = await bcrypt.genSalt(10)

    User.findOne({
        where: {
            [Op.or] : [
                {email: request.body.email},
                {username : request.body.username}
            ]
        }
    }).then(user => {
        if (!user) {
            bcrypt.hash(request.body.password, salt, function (error, bcryptPassword) {
                User.create({
                    email: request.body.email,
                    username: request.body.username,
                    password: bcryptPassword,
                    firstName: request.body.firstName,
                    lastName: request.body.lastName,
                    role: request.body.role
                })
                    .then(newUser => response.status(201).json({ 'id': newUser.id }))
                    .catch(error => response.status(500).json(error))
            })
        } else {
            response.status(409).json('User with this informations already exists !')
        }
    }).catch(error => response.status(500).json({ error: error.details[0].message }))
};

exports.login = (request, response) => {
    const {error} = loginValidation(request.query)
    if(error) return response.status(422).send(error.details[0].message)

    User.findOne({
        where: {
            [Op.or] : [
                {email: request.query.username},
                {username : request.query.username}
            ]
        }
    }).then(user => {
            if (user) {
                bcrypt.compare(request.query.password, user.password, (errComparePassword, resComparePassword) => {
                    if (resComparePassword) {
                        response.status(200).json({
                            userId: user.id,
                            token: jwtTokenUtils.generateToken(user),
                            role: user.role
                        })
                    } else {
                        response.status(403).json({ error: errComparePassword});
                    };
                })
            } else {
                response.status(404).json({ error: 'This user doesn\'t  exist' });
            }
        })
        .catch(error => { response.status(500).json({ error: error.details[0].message }) })
};