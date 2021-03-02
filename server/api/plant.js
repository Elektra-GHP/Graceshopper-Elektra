const router = require('express').Router()
const {Plant, Type} = require('../db/models')
module.exports = router

// GET api/plant/all
router.get('/all', async (req, res, next) => {
  try {
    const plants = await Plant.findAll({include: Type})
    res.json(plants)
  } catch (err) {
    next(err)
  }
})

// GET api/plant/${plant.id}
router.get('/:id', async (req, res, next) => {
  try {
    const plant = await Plant.findByPk(req.params.id, {include: Type})
    res.json(plant)
  } catch (err) {
    next(err)
  }
})
