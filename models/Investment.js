'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Investment extends Model {
        static associate(models) {
          Investment.belongsTo(models.InvestmentType, { as: 'investmenttype', foreignKey: 'investmenttype_id' })
          Investment.belongsTo(models.Goal, { as: 'goal', foreignKey: 'goal_id' })
          Investment.hasMany(models.Activity, { as: 'activities', foreignKey: 'investment_id', onDelete: 'CASCADE', hooks: true })
        }
    }
    Investment.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        order: DataTypes.NUMBER,
        investmenttype_id: DataTypes.STRING,
        goal_id: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
        created_by: DataTypes.UUID,
        updated_by: DataTypes.UUID
    }, {
        sequelize,
        modelName: 'Investment',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
    return Investment
};