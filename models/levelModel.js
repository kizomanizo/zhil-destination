'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class levelModel extends Model {
        static associate(models) {
            levelModel.hasMany(models.userModel, { as: 'Users', foreignKey: 'levelId' })
        }
    }
    levelModel.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        access: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
        createdBy: DataTypes.STRING,
        updatedBy: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'levelModel',
        tableName: 'Levels'
    })
    return levelModel
}