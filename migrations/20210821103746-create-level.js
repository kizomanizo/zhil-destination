'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Levels', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            name: {
                type: Sequelize.STRING,
                required: [true, "Level name is required"]
            },
            description: {
                type: Sequelize.STRING,
                required: false,
                defaultValue: "Level description"
            },
            access: {
                type: Sequelize.STRING,
                required: [true, "Level access level should be like 0.1.2.3"]
            },
            status: {
                type: Sequelize.BOOLEAN,
                required: false,
                defaultValue: true
            },
            createdby: {
                type: Sequelize.UUID,
                required: true
            },
            updatedby: {
                type: Sequelize.UUID,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Levels')
    }
}