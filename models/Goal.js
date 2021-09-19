'use strict';
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Goal extends Model {
        static associate(models) {
            Goal.hasMany(models.Investment, { as: 'investments', foreignKey: 'goal_d' })
        }
    }
    Goal.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        name: DataTypes.STRING,
        details: DataTypes.TEXT,
        status: DataTypes.BOOLEAN,
        created_by: DataTypes.UUID,
        updated_by: DataTypes.UUID
    }, {
        sequelize,
        modelName: 'Goal',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
    return Goal
}