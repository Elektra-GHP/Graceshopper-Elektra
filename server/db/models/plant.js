const Sequelize = require('sequelize')
const db = require('../db')

const Plant = db.define('plant', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://cdn3.vectorstock.com/i/1000x1000/11/52/plant-icon-with-leaves-on-stems-that-grow-from-vector-20931152.jpg',
  },
  description: {
    type: Sequelize.TEXT,
  },
  inventory: { // is there a min or max value for inventory?
    type: Sequelize.INTEGER,
    defaultValue: 5,
  },
  price: { // can price go below 0?
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  light: {
    type: Sequelize.ENUM('direct', 'indirect', 'none'),
  },
  water: {
    type: Sequelize.ENUM('daily', 'bi-weekly', 'weekly'),
  },
  humidity: {
    type: Sequelize.ENUM('low', 'medium', 'high'),
  },
})

module.exports = Plant
