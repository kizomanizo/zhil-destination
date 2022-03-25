'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Client extends Model {
        static associate(models) {
            Client.hasOne(models.Person, { as: 'person', foreignKey: 'client_id', onDelete: 'CASCADE', hooks: true })
            Client.hasMany(models.Order, { as: 'orders', foreignKey: 'client_id', onDelete: 'RESTRICT', hooks: true })
        }
    }
    Client.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        last_purchase: DataTypes.DATE,
        status: DataTypes.BOOLEAN,
        level_id: DataTypes.UUID,
        created_by: DataTypes.UUID,
        updated_by: DataTypes.UUID,
        }, {
            sequelize,
            modelName: 'Client',
            tableName: 'clients',
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        })
    return Client
}