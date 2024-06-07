"use strict";
const { Model } = require("sequelize");
const { uuid } = require("uuidv4");
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Log.belongsTo(models.Incident);
    }
  }
  Log.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      nameOfPersonVisiting: DataTypes.STRING,
      reasonForAttendance: DataTypes.TEXT,
      protectiveClothingWorn: DataTypes.TEXT,
      weatherCondition: DataTypes.TEXT,
      officerCompletingLog: DataTypes.STRING,
      incidentId: DataTypes.UUID,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Log",
    }
  );

  Log.beforeCreate((l, _) => {
    return (l.id = uuid());
  });
  return Log;
};
