const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  products: {
    type: Sequelize.ARRAY,
    defaultValue: []
    // an array of objects.
    // [ {productId: 1}, {productId: 2} ]
  }
})

module.exports = Cart
