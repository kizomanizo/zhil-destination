'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('discounts', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            amount: {
                type: Sequelize.INTEGER,
                required: [true, "Discount amount must be specified"],
            },
            order_item_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'clients',
                    key: 'id'
                }
            },
            created_by: {
                type: Sequelize.UUID,
                required: true
            },
            updated_by: {
                type: Sequelize.UUID,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                type: Sequelize.DATE
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('discounts')
    }
}