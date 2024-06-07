const { Model } = require("sequelize");
const { uuid } = require("uuidv4");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, { foreignKey: "roleId", as: "Role" });
      User.hasMany(models.Incident);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      confirmPassword: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      roleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user, _) => {
    return (user.id = uuid());
  });
  return User;
};
