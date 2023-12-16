const Sequelize = require("sequelize");
//#TODO 관계 맺으면 알아서 생성되는 필드들이 들어가 있음.
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "reviews",
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
      comment: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rate: {
        type: DataTypes.INTEGER,
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
      tableName: "reviews",
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
