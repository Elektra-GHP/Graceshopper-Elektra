const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  orderId: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  orderDate: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  shippingStatus: {
    type: Sequelize.ENUM('pending', 'confirmed', 'shipped', 'delivered'),
    defaultValue: null,
  },
  shippingAddress: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
})

module.exports = Cart
