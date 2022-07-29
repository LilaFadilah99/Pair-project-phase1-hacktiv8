const { User, Product, Category, Account } = require("../models");
const { Op, where } = require("sequelize");

class ProductController {
  static detailProduct(request, response) {
    let id = request.params.id;
    // console.log(id);
    Product.findAll({
      include: [Category],
      where: { id },
    })
      .then((res) => {
        let category = res[0];
        category = category.Category.name;
        response.render("detailProduct", { products: res, category, isLogin: request.session.userId ? true : false, isAdmin: request.session.userId && request.session.role === "admin" ? true : false });
        // response.send(res);
      })
      .catch((err) => {
        response.send(err);
      });
  }

  static buyProducts(request, response) {
    let id = request.params.id;
    // console.log(request.session.userId);
    let UserId = request.session.userId;
    Promise.all([
      Product.findAll({
        include: [Category],
        where: { id },
      }),
      Account.findAll({
        where: { UserId }, // ganti dibagian sini
      }),
    ])
      .then((res) => {
        let category = res[0];
        let account = res[1];
        response.render("buyProducts", { account, category, isLogin: request.session.userId ? true : false, isAdmin: request.session.userId && request.session.role === "admin" ? true : false });
        // response.send(res);
      })
      .catch((err) => {
        // console.log(err);
        response.send(err);
      });
  }

  static addProducts(request, response) {
    Category.findAll({})
      .then((res) => {
        response.render("addProducts", { categories: res, isLogin: request.session.userId ? true : false, isAdmin: request.session.userId && request.session.role === "admin" ? true : false });
      })
      .catch((err) => {
        response.send(err);
      });
  }

  static submitNewProduct(request, response) {
    let { name, description, image, price, stock, CategoryId } = request.body;
    Product.create({
      name,
      description,
      image,
      price,
      stock,
      CategoryId,
      UserId: request.session.userId,
    })
      .then((res) => {
        response.redirect("/");
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          response.render("errors", { errors: err.errors, isLogin: request.session.userId ? true : false, isAdmin: request.session.userId && request.session.role === "admin" ? true : false });
        } else {
          console.log(err);
          response.send(err);
        }
      });
  }

  static productCategory(request, response) {
    let id = request.params.id;
    Product.findAll({
      include: [Category],
      where: {
        CategoryId: id,
        stock: {
          [Op.gt]: 0,
        },
      },
    })
      .then((res) => {
        let category = res[0];
        category = category.Category.name;
        response.render("productCategory", { products: res, category, isLogin: request.session.userId ? true : false, isAdmin: request.session.userId && request.session.role === "admin" ? true : false });
      })
      .catch((err) => {
        response.send(err);
        // console.log(err);
      });
  }

  static thankYouPage(request, response) {
    let id = request.params.id;
    Product.decrement("stock", {
      where: { id },
    })
      .then((res) => {
        response.render("thankYouPage", { isLogin: request.session.userId ? true : false, isAdmin: request.session.userId && request.session.role === "admin" ? true : false });
      })
      .catch((err) => {
        response.send(err);
      });
  }

  static emptyListProducts(request, response) {
    Product.findAll({
      where: {
        stock: {
          [Op.lt]: 1,
        },
      },
    })
      .then((res) => {
        response.render("emptyListProduct", { products: res, isLogin: request.session.userId ? true : false, isAdmin: request.session.userId && request.session.role === "admin" ? true : false });
      })
      .catch((err) => {
        response.send(err);
      });
  }

  static restockProduct(request, response) {
    let id = request.params.id;
    Product.findAll({
      where: { id },
    })
      .then((res) => {
        response.render("restockProduct", { products: res, isLogin: request.session.userId ? true : false, isAdmin: request.session.userId && request.session.role === "admin" ? true : false });
      })
      .catch((err) => {
        response.send(err);
      });
  }

  static submitNewEmptyStock(request, response) {
    let { stock } = request.body;
    let id = request.params.id;
    Product.update(
      {
        stock,
      },
      { where: { id } }
    )
      .then((res) => {
        response.redirect("/");
      })
      .catch((err) => {
        response.send(err);
      });
  }

  static deleteEmptyListProduct(request, response) {
    let id = request.params.id;
    Product.destroy({
      where: { id },
    })
      .then((res) => {
        response.redirect("/products/emptyList");
      })
      .catch((err) => {
        response.send(err);
      });
  }
}

module.exports = ProductController;
