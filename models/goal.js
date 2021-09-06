'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class goal extends Model {
        static associate(models) {
            goal.hasMany(models.investment, { as: 'investments', foreignKey: 'goal_d' })
        }
    };
    goal.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        name: DataTypes.STRING,
        details: DataTypes.TEXT,
        status: DataTypes.BOOLEAN,
        created_by: DataTypes.UUID,
        updated_by: DataTypes.UUID
    }, {
        sequelize,
        modelName: 'goal',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
    return goal;
};