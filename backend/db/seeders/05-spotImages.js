'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-959493006014888753/original/6e4e417f-25e3-4578-941e-42fdd68a3971.jpeg?im_w=720&im_format=avif",
        preview: true
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDI1OTg2MTY%3D/original/e67a37dc-2e7f-4e2d-95c4-a6e8be68fe56.jpeg?im_w=720&im_format=avif",
        preview: true
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/db7d9661-dc52-4283-ad0f-761c920f9bb2.jpg?im_w=720&im_format=avif",
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-49874658/original/a6275d85-daa0-4416-9316-7c4b49c94caa.jpeg?im_w=720&im_format=avif",
        preview: true
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-950729835440706966/original/bd81aa15-2cb9-4ecb-9976-d7c2536fe068.jpeg?im_w=720&im_format=avif",
        preview: true
      },

    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
  }
};
