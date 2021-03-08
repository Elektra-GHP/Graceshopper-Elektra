const Sequelize = require('sequelize')
const db = require('../db')

const Item = db.define('item', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: {
        args: [1],
        msg: 'Cannot order less than 1 item.',
      },
      isInt: true,
    },
    defaultValue: 1,
    allowNull: false,
  },
})

module.exports = Item
