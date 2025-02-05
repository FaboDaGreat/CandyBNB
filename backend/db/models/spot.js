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
      Spot.belongsTo(models.User, {
        foreignKey: "ownerId",
        onDelete: 'cascade',
        hooks: true
      });
      Spot.hasMany(models.Review, {
        foreignKey: 'SpotId',
        onDelete: 'cascade',
        hooks: true
      });
      Spot.hasMany(models.Booking, {
        foreignKey: 'SpotId',
        onDelete: 'cascade',
        hooks: true
      });
      Spot.hasMany(models.SpotImage, {
        foreignKey: 'SpotId',
        onDelete: 'cascade',
        hooks: true
      });
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
      validate: {
        // len: [4, 700]
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
        // len: [2, 6]
      },
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        // len: [2, 6]
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
      validate: {
        // len: [5, 100]
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // len: [2, 1000]
      },
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
      },
    },
  },
    {
      sequelize,
      modelName: 'Spot',
    });
  return Spot;
};
