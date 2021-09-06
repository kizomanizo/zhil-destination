'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class investment extends Model {
        static associate(models) {
          investment.belongsTo(models.investmenttype, { as: 'investmenttype', foreignKey: 'investmenttype_id' })
          investment.belongsTo(models.goal, { as: 'goal', foreignKey: 'goal_id' })
          investment.hasMany(models.activity, { as: 'activities', foreignKey: 'investment_id', onDelete: 'CASCADE', hooks: true })
        }
    };
    investment.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        order: DataTypes.NUMBER,
        investmentTypeId: DataTypes.STRING,
        goalId: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
        created_by: DataTypes.UUID,
        updated_by: DataTypes.UUID
    }, {
        sequelize,
        modelName: 'investment',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return investment;
};