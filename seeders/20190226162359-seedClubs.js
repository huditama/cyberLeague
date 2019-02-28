'use strict';

const fs = require("fs");
let clubs = JSON.parse(fs.readFileSync("./clubs.json", "utf8"));

let container = [];
clubs.map(x => {
  container.push({
    club_name: x.club_name,
    address: x.address,
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
   return queryInterface.bulkInsert('Clubs', container, {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Clubs', null, {})
  }
};
