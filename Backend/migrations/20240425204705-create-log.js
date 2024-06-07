"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Logs", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      nameOfPersonVisiting: {
        type: Sequelize.STRING,
      },
      reasonForAttendance: {
        type: Sequelize.TEXT,
      },
      protectiveClothingWorn: {
        type: Sequelize.TEXT,
      },
      weatherCondition: {
        type: Sequelize.TEXT,
      },
      officerCompletingLog: {
        type: Sequelize.STRING,
      },
      incidentId: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("Logs");
  },
};
