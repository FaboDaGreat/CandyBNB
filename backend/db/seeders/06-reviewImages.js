'use strict';

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      {
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-959493006014888753/original/9f11e90b-5a00-4b50-9ef9-8071a0ad0ac9.jpeg?im_w=480&im_format=avif",
        reviewId: 1
      },
      {
        url: "https://a0.muscache.com/im/pictures/44b56a74-9638-4f63-a9ee-4f75ca10a7b9.jpg?im_w=720&im_format=avif",
        reviewId: 4
      },
      {
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-940026023850515197/original/580ef32e-0e60-4011-bfe7-b5223714fdb7.jpeg?im_w=720&im_format=avif",
        reviewId: 3
      },
      {
        url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-950729835440706966/original/38246646-a905-4c1d-bddf-65659d416d55.jpeg?im_w=720&im_format=avif",
        reviewId: 5
      },
      {
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDI1OTg2MTY%3D/original/e80576b7-9df1-42a1-a5c3-faa187fb0f8b.jpeg?im_w=720&im_format=avif",
        reviewId: 2
      },

    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
    }, {});
  }
};
