const sequelize = require('../database')

const { UserModel } = require('./User')

const User = UserModel(sequelize)

module.exports = {
    User
}