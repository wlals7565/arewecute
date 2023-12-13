const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "reservations",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      petSitterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "pet_sitters",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      company: {
        type: DataTypes.STRING
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false
      },
      animal: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "예약중"
      },
      reservedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      tableName: "reservations",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }]
        },
        {
          name: "userId",
          using: "BTREE",
          fields: [{ name: "userId" }]
        },
        {
          name: "petSitterId",
          using: "BTREE",
          fields: [{ name: "petSitterId" }]
        }
      ]
    }
  );
};
