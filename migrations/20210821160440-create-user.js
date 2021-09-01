'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            username: {
                type: Sequelize.STRING,
                required: [true, "Username is required"],
                defaultValue: "Some String"
            },
            email: {
                type: Sequelize.STRING,
                required: [true, "Email is required, it's not 1993"],
                defaultValue: "Some String"
            },
            password: {
                type: Sequelize.STRING,
                required: [true, "Password is required"],
                allowNull: false
            },
            saltRounds: {
                type: Sequelize.INTEGER,
                required: true
            },
            joinDate: {
                type: Sequelize.DATE,
                required: true
            },
            lastLogin: {
                type: Sequelize.DATE,
                required: true
            },
            tokenExpiry: {
                type: Sequelize.DATE,
                required: false
            },
            status: {
                type: Sequelize.BOOLEAN,
                required: false,
                defaultValue: true
            },
            levelId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                  model: 'Levels',
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
        await queryInterface.dropTable('Users')
    }
}