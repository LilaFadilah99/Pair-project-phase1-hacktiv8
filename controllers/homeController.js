const { User, Product, Category } = require("../models");
const { Op, where } = require("sequelize");
const bcrypt = require("bcryptjs");

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
        response.render("homePage", { products, categories, isLogin: request.session.userId ? true : false });
      })
      .catch((err) => {
        response.send(err);
      });
  }

  static registerForm(request, response) {
    response.render("register", { isLogin: request.session.userId ? true : false });
  }
  static submitRegister(request, response) {
    let { username, email, password, role } = request.body;
    User.create({ username, email, password, role })
      .then((res) => {
        response.redirect("/login");
      })
      .catch((err) => {
        response.send(err);
      });
  }
  static loginForm(request, response) {
    const { error } = request.query;
    response.render("loginForm", { error, isLogin: request.session.userId ? true : false });
  }
  static submitLoginUser(request, response) {
    const { username, password } = request.body;
    User.findOne({ where: { username } })
      .then((user) => {
        if (user) {
          const isvalidPassword = bcrypt.compareSync(password, user.password);
          if (isvalidPassword) {
            request.session.userId = user.id;
            request.session.role = user.role;
            return response.redirect("/");
          } else {
            const error = "invalid username/password";
            return response.redirect(`/login?error=${error}`);
          }
        } else {
          const error = "invalid username/password";
          return response.redirect(`/login?error=${error}`);
        }
      })
      .catch((err) => {
        response.send(err);
      });
  }

  static getlogout(request, response) { //hendel untuk bagian logout
    request.session.destroy((err) => {
      if (err) {
        response.send(err);
      } else {
        response.redirect("/login");
      }
    });
  }
}

module.exports = HomeController;
