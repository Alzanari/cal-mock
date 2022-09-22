'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsTo(models.User, { foreignKey:'userId', targetKey:"id"} );
    }
  }
  Event.init({
    title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    comment: {
      type: DataTypes.STRING
    },
    status: {
      allowNull: false,
      type: DataTypes.ENUM('pending','validated', 'rejected'),
      defaultValue: 'pending'
    },
    userId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Event',
    tableName:'event',
    timestamps: true,
    underscored: true,
    freezeTableName:true
  });
  return Event;
};