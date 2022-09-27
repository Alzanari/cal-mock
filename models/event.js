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
    title: DataTypes.STRING,
    comment: DataTypes.STRING,
    start:DataTypes.DATE,
    end:DataTypes.DATE,
    allDay:DataTypes.TINYINT,
    status: DataTypes.ENUM('pending','validated', 'rejected')
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};