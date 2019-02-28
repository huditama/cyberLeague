'use strict';

const fs = require("fs");
let players = JSON.parse(fs.readFileSync("./players.json", "utf8"));

let container = [];
players.map(x => {
  container.push({
    first_name: x.first_name,
    last_name: x.last_name,
    gender: x.gender,
    email: x.email,
    password: x.password,
    role: x.role,
    createdAt: new Date(),
    updatedAt: new Date()
  })
})

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Players', container, {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Players', null, {})
  }
};
