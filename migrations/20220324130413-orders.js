'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('orders', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            order_date: {
                allowNull: false,
                type: Sequelize.DATE
            },
            paid_price: {
                type: Sequelize.INTEGER,
                required: [true, "Paid price must be specified"],
            },
            client_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'clients',
                    key: 'id'
                }
            },
            insurance: {
                type: Sequelize.BOOLEAN,
                required: false,
                defaultValue: false
            },
            insurance_number: {
                type: Sequelize.STRING,
                allowNull: true
            },
            insurance_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'insurances',
                    key: 'id'
                }
            },
            status: {
                type: Sequelize.BOOLEAN,
                required: false,
                defaultValue: true
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
        await queryInterface.dropTable('orders')
    }
}