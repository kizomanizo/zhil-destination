'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class personModel extends Model {
        static associate(models) {
            personModel.belongsTo(models.userModel, { as: 'User', foreignKey: 'userId' })
        }
    }
    personModel.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        mobilephone: DataTypes.STRING,
        organization: DataTypes.STRING,
        userId: DataTypes.STRING,
        createdBy: DataTypes.STRING,
        updatedBy: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'personModel',
        tableName: 'People'
  })
  return personModel
}