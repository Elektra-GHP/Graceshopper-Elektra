const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  quantity: {
    type: Sequelize.INTEGER
  }
})

module.exports = Product
