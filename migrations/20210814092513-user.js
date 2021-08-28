'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.createTable("users", {
     id: {
       primaryKey: true,
       type: Sequelize.INTEGER,
       autoIncrement: true,
       allowNull: false,
     },
     email: {
      unique: true,
      type: Sequelize.STRING,
      allowNull: false,
     },
     first_name: {
       type: Sequelize.STRING,
       allowNull: false,
     },
     last_name: {
       type: Sequelize.STRING,
       allowNull: false,
     },
     password_hash: {
       type: Sequelize.STRING,
       allowNull: false,
     },
     created_at: {
       type: Sequelize.DATE,
       defultValue: Sequelize.fn("now"),
       allowNull: false,
     },
     updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.fn("now"),
      allowNull: false,
    },
   });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  }

};
