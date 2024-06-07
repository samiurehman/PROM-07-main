"use strict";
const bcryptjs = require("bcryptjs");
const { uuid } = require("uuidv4");

/** @type {import('sequelize-cli').Migration} */
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

    let salt = await bcryptjs.genSalt(10);
    let hash = await bcryptjs.hash("12345web", salt);

    return queryInterface.bulkInsert("Users", [
      {
        id: uuid(),
        firstName: "admin",
        lastName: "team3",
        email: "admin@team3.com",
        roleId: 1,
        password: hash,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        firstName: "James",
        lastName: "Uguna",
        email: "jamesuguna@team3.com",
        roleId: 2,
        password: hash,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        firstName: "Damola",
        lastName: "Oyeniran",
        email: "damolaoyeniran@team3.com",
        roleId: 2,
        password: hash,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        firstName: "Akpos",
        lastName: "Sakpere",
        email: "akpossakpere@team3.com",
        roleId: 2,
        password: hash,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        firstName: "Louis",
        lastName: "Torsu",
        email: "louistorsu@team3.com",
        roleId: 2,
        password: hash,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuid(),
        firstName: "Sam",
        lastName: "Urehman",
        email: "samurehman@team3.com",
        roleId: 2,
        password: hash,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
