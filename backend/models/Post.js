const {Sequelize, DataTypes} = require('sequelize')
const db = require('../config/database')
const User = require('../models/User')

const Post = db.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    tableName: 'posts',
    freezeTableName: true
})

Post.belongsTo(User, {
    foreignKey: 'author'
});

module.exports = Post