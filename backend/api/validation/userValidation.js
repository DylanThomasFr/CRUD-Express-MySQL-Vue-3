const Joi = require('joi')

const registerValidation = data => {
    const skeleton = Joi.object({
        username : Joi.string().required(),
        password: Joi.string().required().min(6),
        email: Joi.string().required().email(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        role: Joi.number().integer().min(1).required()
    })
    return skeleton.validate(data)
}

const loginValidation = data => {
    const skeleton = Joi.object({
        username : Joi.string().required(),
        password: Joi.string().required().min(6)
    })
    return skeleton.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation