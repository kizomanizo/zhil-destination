'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class activity extends Model {
    static associate(models) {
      activity.belongsTo(models.investment, { as: 'investment', foreignKey: 'investment_id' })
    }
  };
  activity.init({
    name: DataTypes.STRING,
    order: DataTypes.NUMBER,
    investment_id: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'activity',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return activity;
};