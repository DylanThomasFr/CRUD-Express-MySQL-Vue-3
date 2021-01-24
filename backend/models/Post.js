const Sequelize = require('sequelize')
const db = require('../config/database')
const User = require('User')

const Post = db.define('posts', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Post.belongsTo(User, {
    foreignKey: 'author'
});

module.exports = Post