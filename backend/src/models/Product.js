// =======================================
// MODELO PRODUCT (PRODUCTOS)
// =======================================

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },

  image: {
  type: DataTypes.STRING,
  allowNull: true
}
}, {
  timestamps: true
});

module.exports = Product;