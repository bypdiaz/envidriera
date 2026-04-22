// =======================================
// MODELO BUSINESS (NEGOCIOS)
// Cada usuario puede tener uno o varios
// =======================================

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Business = sequelize.define('Business', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true
});

const Product = require('./Product');

// Relación
Business.hasMany(Product, { foreignKey: 'businessId' });
Product.belongsTo(Business, { foreignKey: 'businessId' });

module.exports = Business;