'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Insurance extends Model {
        static associate(models) {
            Insurance.hasMany(models.Order, { as: 'orders', foreignKey: 'insurance_id', onDelete: 'RESTRICT', hooks: true })
        }
    }
    Insurance.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        access: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
        created_by: DataTypes.STRING,
        updated_by: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Insurance',
        tableName: 'insurances',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
  return Insurance
}