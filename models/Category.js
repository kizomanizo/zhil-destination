'use strict'

const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.Item, { as: 'items', foreignKey: 'category_id', onDelete: 'RESTRICT', hooks: true })
        }
    }
    Category.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        status: DataTypes.BOOLEAN,
        created_by: DataTypes.UUID,
        updated_by: DataTypes.UUID,
    }, {
        sequelize,
        modelName: 'Category',
        tableName: 'categories',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
    return Category
}