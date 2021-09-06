'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class level extends Model {
        static associate(models) {
            level.hasMany(models.user, { as: 'users', foreignKey: 'level_id', onDelete: 'RESTRICT', hooks: true })
        }
    }
    level.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        access: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
        created_by: DataTypes.STRING,
        updated_by: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'level',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
    return level
}