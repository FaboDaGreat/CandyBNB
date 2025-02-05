'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Reviews.belongsTo(models.Spot, {
        foreignKey: "spotID",
        onDelete: 'cascade',
        hooks: true
      });

      Reviews.belongsTo(models.User, {
        foreignKey: "userID",
        onDelete: 'cascade',
        hooks: true
      });
      Reviews.hasOne(models.ReviewImage, {
        foreignKey: 'reviewId',
        onDelete: 'cascade',
        hooks: true
      });
    }
  }
  Reviews.init(
    {
     
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      review: {
        type: DataTypes.STRING,
        allowNull: false
      },
      stars: {
        type: DataTypes.INTEGER,
    validate: {
    len: [1, 5]
    },
      }, 
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};