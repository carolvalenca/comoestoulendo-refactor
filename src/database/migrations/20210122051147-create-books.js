'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Books', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userEmail: {
        type: Sequelize.DataTypes.STRING,
        references: {
          model: "Users",
          key: "email"
        },
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      author: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cover: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pages: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      lastPage: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      pagesPerDay: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      totalDaysReading: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      finished: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
     return queryInterface.dropTable('Books');
  }
};
