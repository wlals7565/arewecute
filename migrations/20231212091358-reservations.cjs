"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("reservations", {
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
      company: {
        type: Sequelize.STRING
      },
      intro: {
        type: Sequelize.STRING,
        allowNull: false
      },
      animal: {
        type: Sequelize.STRING,
        allowNull: false
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "예약중"
      },
      reservedAt: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("reservations");
  }
};
