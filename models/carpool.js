const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Carpool = sequelize.define('carpool', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    meetupAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    meetUpCity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    meetUpState: {
      type: DataTypes.STRING,
      allowNull: false
    },
    meetUpZipCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false
    },
    resortId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    departureDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    departureTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    returningDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    returningTime: {
      type: DataTypes.STRING,
      allowNull: false
    },
    users: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false
    },
  });


module.exports = Carpool;