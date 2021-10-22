const Sequelize = require('sequelize');
const database = require('../db')

const User = database.define('Users', {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    unique: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false
  },
  birth: {
    type: Sequelize.DATE,
    allowNull: false
  },
  photograph: {
    type: Sequelize.STRING,
    allowNull: true
  },
  photograph_public_id: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

module.exports = User;