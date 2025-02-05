'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER(50),
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        }
        },
      spotId: {
        type: Sequelize.INTEGER(50),
        allowNull: false,
        references: {
          model: 'Spots',
          key: 'id',
        }

        },
      review: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      stars: {
        type: Sequelize.INTEGER(5),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Reviews');
  }
};