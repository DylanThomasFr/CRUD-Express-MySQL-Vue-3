'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate({User}) {
            this.belongsTo(User, {foreignKey: 'author'})
        }
    };
    Post.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.INTEGER,
            allowNull:false
        }
    }, {
        sequelize,
        tableName: 'posts',
        modelName: 'Post',
    });
    return Post;
};