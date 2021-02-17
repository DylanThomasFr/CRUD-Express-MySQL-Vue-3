const fs = require('fs')
const path = require('path')
require('dotenv').config()
const Sequelize = require('sequelize')
const configJson = require('../../config/config')

const basename = path.basename(__filename)
const env = process.env.NODE_ENV ?? 'development'

const config = configJson[env]

const db = {}

let sequelize
if (config.environment === 'production') {
  sequelize = new Sequelize(
      process.env[config.use_env_variable], config
  );
  sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        dialectOption: {
          ssl: true,
          native: true
        },
        logging: true
      }
  );
} else {
  sequelize = new Sequelize(
      config.database, config.username, config.password, config
  );
}

fs
    .readdirSync(__dirname)
    .filter((file) => {
      return (file.indexOf('.') !== 0) &&
          (file !== basename) && (file.slice(-3) === '.js')
    })
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
      db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
});

db.sequelize = sequelize
db.Sequelize = Sequelize;

module.exports = db;