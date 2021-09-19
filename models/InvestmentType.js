'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class InvestmentType extends Model {
    static associate(models) {
      InvestmentType.hasMany(models.Investment, { as: 'investments', foreignKey: 'investmenttype_id', onDelete: 'RESTRICT', hooks: true })
    }
  }
  InvestmentType.init({
    id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'InvestmentType',
    tableName: 'investmenttypes',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  })
  return InvestmentType
}     