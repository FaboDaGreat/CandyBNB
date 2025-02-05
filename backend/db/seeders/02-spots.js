'use strict';

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate([
        {
            ownerId: 1,
            address: "123 spongebob way",
            city: "bikini bottom",
            state: "hawaii",
            country: "usa",
            lat: 38.8977,
            lng: -77.0365,
            name: "Pineapple",
            description:"pineapple under the sea",
            price: 55.00
        },
        {
            ownerId: 1,
            address: "555 vscode st",
            city: "bikini bottom",
            state: "hawaii",
            country: "usa",
            lat: 38.8977,
            lng: -77.0365,
            name: "code editor",
            description:"Best place to code",
            price: 90.00
        },
        {
            ownerId: 2,
            address: "group 3 apt 1",
            city: "New York City",
            state: "New York",
            country: "usa",
            lat: 38.8977,
            lng: -77.0365,
            name: "A cool group",
            description:"A place where peopel code",
            price: 20.00
        },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
  }
};
