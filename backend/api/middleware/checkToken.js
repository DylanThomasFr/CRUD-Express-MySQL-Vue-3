const jwt = require('jsonwebtoken')
const { request } = require('express')

module.exports = function (request, response, next) {
    if(request.headers.authorization) {
        const token = request.headers.authorization.split(' ')[1]
        const secret = process.env.TOKEN_SECRET || 'RANDOM_TOKEN_SECRET'
        if(!token) return response.status(401).send('Access Denied')

        try{
            request.user = jwt.verify(token, secret)
            next()
        }catch(error){
            return response.status(401).send('Access Denied')
        }
    } else {
        return response.status(401).send('Access Denied')
    }
}