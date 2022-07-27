"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, { foreignKey: "UserId" });
      User.hasOne(models.Account, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Username tidak boleh kosong",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Email tidak boleh kosong",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Password tidak boleh kosong",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Role tidak boleh kosong",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate(instance, option) {
          const salt = bcrypt.genSaltSync(8);
          const hash = bcrypt.hashSync(instance.password, salt);
          instance.password = hash;
          // console.log(instance, "---> di beforeCreate");
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
