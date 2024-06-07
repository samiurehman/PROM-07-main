"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Incidents", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      natureOfIncident: {
        type: Sequelize.STRING,
      },
      locationOfIncident: {
        type: Sequelize.STRING,
      },
      weatherCondition: {
        type: Sequelize.STRING,
      },
      switchingOfficer: {
        type: Sequelize.STRING,
      },
      closed: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Incidents");
  },
};
