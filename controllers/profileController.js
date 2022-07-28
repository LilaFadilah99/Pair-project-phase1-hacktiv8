const { User, Product, Category, Account } = require("../models");
const { Op, where } = require("sequelize");
const bcrypt = require("bcryptjs");

class UserController {
  static profile(request, response) {
    let id = request.session.userId;
    User.findAll({
      include: [Account],
      where: { id },
    })
      .then((res) => {
        let user = res[0];
        response.render("profile", { user, isLogin: request.session.userId ? true : false, isAdmin: request.session.userId && request.session.role === "admin" ? true : false  });
        // response.send(res[0]);
      })
      .catch((err) => {
        response.send(err);
      });
  }

  static addProfile(request, response) {
    let id = request.params.id;
    User.findAll({
      where: { id },
    })
      .then((res) => {
        let user = res[0];
        response.render("addProfile", { user, isLogin: request.session.userId ? true : false, isAdmin: request.session.userId && request.session.role === "admin" ? true : false  });
      })
      .catch((err) => {
        response.send(err);
      });
  }

  static submitUserProfile(request, response) {
    let id = request.params.id;
    let { name, addres, gender } = request.body;
    Account.create({ name, addres, gender, UserId: id })
      .then((res) => {
        response.redirect("/profile");
      })
      .catch((err) => {
        response.send(err);
      });
  }

  static editProfile(request, response) {
    let id = request.params.id;
    // console.log(request.session.UserId);
    Account.findAll({ where: { UserId: id } }) // ada bug disini dimana seharusnya yang benar itu UserId : id
      .then((res) => {
        // console.log(res);
        let account = res[0];
        response.render("editProfile", { account, isLogin: request.session.userId ? true : false, isAdmin: request.session.userId && request.session.role === "admin" ? true : false  });
      })
      .catch((err) => {
        response.send(err);
        console.log(err);
      });
  }

  static submitEditProfile(request, response) {
    let id = request.params.id;
    let { name, addres, gender } = request.body;
    Account.update({ name, addres, gender }, { where: { id } })
      .then((res) => {
        response.redirect("/profile");
      })
      .catch((err) => {
        response.send(err);
        console.log(err);
      });
  }
}

module.exports = UserController;
