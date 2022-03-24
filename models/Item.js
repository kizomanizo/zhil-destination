'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Item extends Model {
        static associate(models) {
            Item.belongsTo(models.category, { as: 'category', foreignKey: 'category_id' })
            Item.hasMany(models.OrderItem, { as: 'order_items', foreignKey: 'item_id', onDelete: 'RESTRICT', hooks: true })
        }
    }
    Item.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        purchase_date: DataTypes.DATE,
        expiry_date: DataTypes.DATE,
        buying_price: DataTypes.NUMBER,
        selling_price: DataTypes.NUMBER,
        category_id: DataTypes.UUID,
        status: DataTypes.BOOLEAN,
        created_by: DataTypes.UUID,
        updated_by: DataTypes.UUID
    }, {
        sequelize,
        modelName: 'Investment',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
    return Item
};