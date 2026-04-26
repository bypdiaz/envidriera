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
const Post = require('./Post');

// Relación con Product
Business.hasMany(Product, { foreignKey: 'businessId' });
Product.belongsTo(Business, { foreignKey: 'businessId' });

// Relación con Post
Business.hasMany(Post, {
  foreignKey: 'businessId',
  as: 'posts'
});

Post.belongsTo(Business, {
  foreignKey: 'businessId',
  as: 'business'
});


module.exports = Business;