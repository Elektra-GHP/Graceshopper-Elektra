const Sequelize = require('sequelize')
const db = require('../db')

const Plant = db.define('plant', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter a plant name.',
      },
    },
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://cdn3.vectorstock.com/i/1000x1000/11/52/plant-icon-with-leaves-on-stems-that-grow-from-vector-20931152.jpg',
    validate: {
      isUrl: 'Please enter an image URL.',
    },
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: '',
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 5,
    validate: {
      isInt: {
        msg: 'Please enter a whole number greater than 0.',
      },
      min: {
        args: [0],
        msg: 'Cannot have less than 0 of plant in inventory.',
      },
    },
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
    validate: {
      isDecimal: {
        msg: 'Please enter a decimal value for price.',
      },
      min: 0,
    },
  },
  light: {
    type: Sequelize.ENUM('direct', 'indirect', 'none'),
    defaultValue: 'direct',
  },
  water: {
    type: Sequelize.ENUM('daily', 'bi-weekly', 'weekly'),
    defaultValue: 'daily',
  },
  humidity: {
    type: Sequelize.ENUM('low', 'medium', 'high'),
    defaultValue: 'low',
  },
})

module.exports = Plant
