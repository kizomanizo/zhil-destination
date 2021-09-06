'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        static associate(models) {
            user.hasOne(models.person, { as: 'person', foreignKey: 'user_id', onDelete: 'cascade', hooks: true })
            user.belongsTo(models.level, { as: 'level', foreignKey: 'level_id' })
        }
    }
    user.init({
        id: { primaryKey: true, type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4 },
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        salt_rounds: DataTypes.INTEGER,
        join_date: DataTypes.DATE,
        last_login: DataTypes.DATE,
        token_expiry: DataTypes.DATE,
        status: DataTypes.BOOLEAN,
        level_id: DataTypes.STRING,
        created_by: DataTypes.STRING,
        updated_by: DataTypes.STRING,
        }, {
            sequelize,
            modelName: 'user',
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        })
    return user
}