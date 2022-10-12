"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.User, { foreignKey: "userId", targetKey: "id" });
    }
  }
  Event.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comment: DataTypes.STRING,
      start: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end: DataTypes.DATE,
      allDay: DataTypes.TINYINT,
      status: {
        type: DataTypes.ENUM("pending", "validated", "rejected"),
        defaultValue: "pending",
      },
      color: {
        type: DataTypes.STRING(7),
        defaultValue: "#FF6F0E",
      },
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
