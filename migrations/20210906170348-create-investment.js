'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('investments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        required: true
      },
      description: {
        type: Sequelize.TEXT
      },
      order: {
        type: Sequelize.INTEGER
      },
      investmenttype_id: {
        type: Sequelize.UUID,
        references: {
          model: 'investmenttypes',
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
      goal_id: {
        type: Sequelize.UUID,
        references: {
          model: 'goals',
          key: 'id'
        },
        onDelete: 'CASCADE',
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
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
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('investments');
  }
};