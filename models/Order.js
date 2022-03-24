'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            OrderItem.belongsTo(models.Client, { as: 'client', foreignKey: 'client_id' })
            Order.hasMany(models.OrderItem, { as: 'order_items', foreignKey: 'order_id', onDelete: 'CASCADE', hooks: true })
        }
    }
    Order.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        order_date: DataTypes.DATE,
        paid_price: DataTypes.INTEGER,
        client_id: DataTypes.UUID,
        insurance: DataTypes.BOOLEAN,
        insurance_number: DataTypes.STRING,
        insurance_id: DataTypes.UUID,
        status: DataTypes.BOOLEAN,
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