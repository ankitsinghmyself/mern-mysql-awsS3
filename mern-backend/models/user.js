const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database');

const sequelize = new Sequelize(db.database, db.username, db.password, {
  host: db.host,
  dialect: db.dialect,
});

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profile_pic_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  updatedDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Synchronize User model with database
User.sync()
  .then(() => {
    console.log('User model synced with database');
  })
  .catch((error) => {
    console.error('Error syncing User model with database:', error);
  });

// Export User model
module.exports = User;
