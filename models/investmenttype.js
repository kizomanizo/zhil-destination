'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class investmenttype extends Model {
    static associate(models) {
      investmenttype.hasMany(models.investment, { as: 'investments', foreignKey: 'investmenttype_d', onDelete: 'RESTRICT', hooks: true })
    }
  };
  investmenttype.init({
    id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
    name: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    created_by: DataTypes.UUID,
    updated_by: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'investmenttype',
    tableName: 'investmenttypes',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  return investmenttype;
};