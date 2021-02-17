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
        if (data.length > 1) {
            let token = data.split(' ')[1];
            try {
                let decodedToken = jwt.verify(token, this.tokenSign)
                userId = decodedToken.userId
                return userId
            }
            catch (err) {
                return err
            }
        };
    }
}
