'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class userModel extends Model {
        static associate(models) {
            userModel.hasOne(models.personModel, { as: 'Person', foreignKey: 'userId', onDelete: 'cascade', hooks: true })
            userModel.belongsTo(models.levelModel, { as: 'Level', foreignKey: 'levelId' })
        }
    }
    userModel.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        saltRounds: DataTypes.INTEGER,
        joinDate: DataTypes.DATE,
        lastLogin: DataTypes.DATE,
        tokenExpiry: DataTypes.DATE,
        status: DataTypes.BOOLEAN,
        levelId: DataTypes.STRING,
        createdBy: DataTypes.STRING,
        updatedBy: DataTypes.STRING,
        }, {
            sequelize,
            modelName: 'userModel',
            tableName: 'Users'
        })
    return userModel
}