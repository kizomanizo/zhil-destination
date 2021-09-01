'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('People', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            firstname: {
                type: Sequelize.STRING,
                required: [true, "Firstname is required"]
            },
            lastname: {
                type: Sequelize.STRING,
                required: [true, "Lastname is required"]
            },
            mobilephone: {
                type: Sequelize.STRING,
                required: false
            },
            organization: {
                type: Sequelize.STRING,
                required: [true, "Organization is required"]
            },
            userId: {
                  type: Sequelize.UUID,
                  allowNull: false,
                  references: {
                  model: 'Users',
                  key: 'id'
              }
            },
            createdBy: {
                type: Sequelize.UUID,
                required: true
            },
            updatedBy: {
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
        await queryInterface.dropTable('People')
    }
}