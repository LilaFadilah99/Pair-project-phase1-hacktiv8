const { User, Product, Category } = require("../models");
const { Op, where } = require("sequelize");

class HomeController {
  static homePage(request, response) {
    let { name } = request.query;
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
    Promise.all([Product.findAll(opt), Category.findAll({})])
      .then((res) => {
        let products = res[0];
        let categories = res[1];
        response.render("homePage", { products, categories });
      })
      .catch((err) => {
        response.send(err);
      });
  }
}

module.exports = HomeController;
