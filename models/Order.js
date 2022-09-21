'use strict'
const { Model, DatabaseError } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            Order.belongsToMany(models.Item, {through: 'OrderItem'})
        }
    }
    Order.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        quantity: DataTypes.INTEGER,
        paid_price: DataTypes.INTEGER,
        order_id: DataTypes.UUID,
        item_id: DataTypes.UUID,
        created_by: DataTypes.UUID,
        updated_by: DataTypes.UUID
    }, {
        sequelize,
        modelName: 'Order',
        tableName: 'orders',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    })
  return Order
}