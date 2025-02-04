'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
Spot.belongsTo(models.Review, {
  foreignKey: "Id"
})
Spot.belongsTo(models.SpotImage, {
  foreignKey: "SpotId"
})
Spot.belongsTo(models.Booking, {
  foreignKey: "spotId"
})
    }
  }
  Spots.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    ownerId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 700]
      },
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50]
      },
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50]
      },
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50]
      },
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        len: [9, 2]
      },
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        len: [9, 2]
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [5, 100]
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [50, 1000]
      },
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        len: [9, 2]
      },
    },
  }, 
  {
    sequelize,
    modelName: 'Spots',
  });
  return Spots;
};