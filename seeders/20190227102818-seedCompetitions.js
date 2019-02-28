'use strict';

const fs = require("fs");
let competitions = JSON.parse(fs.readFileSync("./competitions.json", "utf8"));

let container = [];
competitions.map(x => {
  container.push({
    competition_name: x.competition_name,
    schedule: null,
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
   return queryInterface.bulkInsert('Competitions', container, {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Competitions', null, {})
  }
};
