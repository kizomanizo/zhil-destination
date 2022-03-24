'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Person extends Model {
        static associate(models) {
            Person.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' })
            Person.belongsTo(models.Client, { as: 'client', foreignKey: 'client_id' })
        }
    }
    Person.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        mobilephone: DataTypes.STRING,
        user_id: DataTypes.STRING,
        client_id: DataTypes.STRING,
        created_by: DataTypes.STRING,
        updated_by: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Person',
        tableName: 'people',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
  })
  return Person
}