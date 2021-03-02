const router = require('express').Router()
const {Plant, Type} = require('../db/models')
module.exports = router

// GET api/plants/
router.get('/', async (req, res, next) => {
  try {
    const plants = await Plant.findAll({include: Type})
    console.log('plants:', plants)
    res.json(plants)
  } catch (err) {
    next(err)
  }
})

// GET api/plants/${plant.id}
router.get('/:id', async (req, res, next) => {
  try {
    const plant = await Plant.findByPk(req.params.id, {include: Type})
    res.json(plant)
  } catch (err) {
    next(err)
  }
})
