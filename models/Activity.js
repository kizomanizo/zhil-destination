'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    static associate(models) {
      Activity.belongsTo(models.Investment, { as: 'investment', foreignKey: 'investment_id' })
    }
  }
  Activity.init({
    name: DataTypes.STRING,
    order: DataTypes.NUMBER,
    investment_id: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Activity',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
  return Activity
}