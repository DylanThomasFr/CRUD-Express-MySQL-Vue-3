const Joi = require('joi')

const addPostValidation = data => {
    const skeleton = Joi.object({
        title : Joi.string().required(),
        content: Joi.string().required().min(6),
    })
    return skeleton.validate(data)
}

module.exports.addPostValidation = addPostValidation