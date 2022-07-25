"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let categories = require("../data/category.json");
    categories = categories.map((category) => {
      category.createdAt = new Date();
      category.updatedAt = new Date();
      return category;
    });
    await queryInterface.bulkInsert("Categories", categories, {});
    await queryInterface.sequelize.query(`SELECT setval('"Categories_id_seq"', (SELECT MAX(id) FROM "Categories"))`);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
