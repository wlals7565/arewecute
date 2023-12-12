"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("reviews", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      petSitterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "pet_sitters",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rate: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("reviews");
  }
};
