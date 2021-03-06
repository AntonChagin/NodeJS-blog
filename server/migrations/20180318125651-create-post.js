'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      topic: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      annotation: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      text: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: "Users",
          key: 'id',
          as: 'userId',
        },
      },
    });
  },
  down: (queryInterface/*, Sequelize*/) => {
    return queryInterface.dropTable('Posts');
  }
};
