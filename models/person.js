'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class person extends Model {
        static associate(models) {
            person.belongsTo(models.user, { as: 'user', foreignKey: 'user_id' })
        }
    }
    person.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        mobilephone: DataTypes.STRING,
        organization: DataTypes.STRING,
        user_id: DataTypes.STRING,
        created_by: DataTypes.STRING,
        updated_by: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'person',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
  })
  return person
}