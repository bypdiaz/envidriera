const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  businessId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  videoUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },

  embedUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },

  description: {
    type: DataTypes.TEXT
  },

  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }

}, {
  timestamps: true
});

module.exports = Post;