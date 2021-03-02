const Sequelize = require('sequelize')
const db = require('../db')

const Type = db.define('type', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  origin: {
    type: Sequelize.STRING
  }
})

module.exports = Type
