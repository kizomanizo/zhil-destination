'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('categories', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            name: {
                type: Sequelize.STRING,
                required: [true, "Category name is required"]
            },
            description: {
                type: Sequelize.TEXT,
                required: false,
                defaultValue: "Category description"
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
        await queryInterface.dropTable('categories')
    }
}