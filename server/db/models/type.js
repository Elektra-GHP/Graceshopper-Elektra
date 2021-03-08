const Sequelize = require('sequelize')
const db = require('../db')

const Type = db.define('type', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: 'Please enter a valid name.',
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  origin: {
    type: Sequelize.TEXT,
  },
})

module.exports = Type
