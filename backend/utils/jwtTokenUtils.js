let jwt = require("jsonwebtoken")
require('dotenv').config()

module.exports = {
    tokenSign : process.env.TOKEN_SECRET || 'RANDOM_TOKEN_SECRET',
    generateToken: function (user) {
        return jwt.sign({
                userId: user.id,
            },
            this.tokenSign,
            {
                expiresIn: '24h'
            })
    },
    getUserId: function (data) {
        let tokenSign = process.env.TOKEN_SECRET || 'RANDOM_TOKEN_SECRET'
        if (data.length > 1) {
            let token = data.split(' ')[1];
            try {
                let decodedToken = jwt.verify(token, tokenSign)
                return decodedToken.userId
            }
            catch (err) {
                return err
            }
        };
    }
}
