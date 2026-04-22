// =======================================
// MODELO USER
// Representa a los usuarios del sistema
// =======================================

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  role: {
    type: DataTypes.STRING,
    defaultValue: "USER"
  },

  plan: {
    type: DataTypes.STRING,
    defaultValue: "FREE"
  }

}, {
  timestamps: true // crea createdAt y updatedAt
});

const Business = require('./Business');

// Relación
User.hasMany(Business, { foreignKey: 'userId' });
Business.belongsTo(User, { foreignKey: 'userId' });


module.exports = User;