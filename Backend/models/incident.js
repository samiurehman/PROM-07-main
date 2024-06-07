"use strict";
const { Model } = require("sequelize");
const { uuid } = require("uuidv4");
module.exports = (sequelize, DataTypes) => {
  class Incident extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Incident.belongsTo(models.User, { foreignKey: "userId", as: "User" });
      Incident.hasMany(sequelize.define("Log"));
    }
  }
  Incident.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      natureOfIncident: DataTypes.STRING,
      locationOfIncident: DataTypes.STRING,
      weatherCondition: DataTypes.STRING,
      switchingOfficer: DataTypes.STRING,
      closed: DataTypes.BOOLEAN,
      date: DataTypes.DATE,
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Incident",
    }
  );

  Incident.beforeCreate((inc, _) => {
    return (inc.id = uuid());
  });
  return Incident;
};
