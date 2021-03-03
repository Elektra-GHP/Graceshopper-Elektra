const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  sessionId: {
    type: Sequelize.STRING,
  },
})

module.exports = Cart
