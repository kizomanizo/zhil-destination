'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class OrderItem extends Model {
        static associate(models) {
            OrderItem.belongsTo(models.Order, { as: 'order', foreignKey: 'order_id' })
            OrderItem.belongsTo(models.Item, { as: 'item', foreignKey: 'item_id' })
        }
    }
    OrderItem.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        quantity: DataTypes.INTEGER,
        order_id: DataTypes.UUID,
        item_id: DataTypes.UUID,
        created_by: DataTypes.UUID,
        updated_by: DataTypes.UUID
    }, {
        sequelize,
        modelName: 'OrderItem',
        tableName: 'order_items',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
  return OrderItem
}