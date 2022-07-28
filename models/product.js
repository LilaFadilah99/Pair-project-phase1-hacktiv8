"use strict";
const { Model } = require("sequelize");
const { Op, where } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     get formatDate(){ // untuk hendel tampilan waktu dalam indonesia
      let date = new Date(this.updatedAt);
      let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

      return date.toLocaleString('id-ID', options)
    }

    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: "CategoryId" });
      Product.belongsTo(models.User, { foreignKey: "UserId" });
    }
    static scopeNotEmptyProducts(name) {
      let opt = {
        where: {
          stock: {
            [Op.gt]: 0,
          },
        },
      };
      if (name) {
        opt.where.name = {
          [Op.iLike]: `%${name}%`,
        };
      }
      return Product.findAll(opt);
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Nama tidak boleh kosong",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            args: true,
            msg: "Description tidak boleh kosong",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: "Price tidak boleh kosong",
          },
        },
      },
      image: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            args: true,
            msg: "Image tidak boleh kosong",
          },
        },
      },
      stock: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
