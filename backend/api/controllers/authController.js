const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
            bcrypt.hash(request.body.password, salt, function (err, bcryptPassword) {
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
            response.status(409).json({ error: user })
        }
    }).catch(error => response.status(500).json({ error: error }))
};

exports.login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (email == null || password == null) {
        res.status(400).json({ error: 'Il manque une information' })
    }


    models.User.findOne({
        where: { email: email }
    }).then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (errComparePassword, resComparePassword) => {
                    if (resComparePassword) {
                        res.status(200).json({
                            userId: user.id,
                            token: jwtTokenUtils.generateToken(user),
                            isAdmin: user.isAdmin
                        })
                    } else {
                        res.status(403).json({ error: 'invalid password' });
                    };
                })
            } else {
                res.status(404).json({ 'erreur': 'Cet utilisateur n\'existe pas' })
            }
        })
        .catch(err => { res.status(500).json({ err }) })
};