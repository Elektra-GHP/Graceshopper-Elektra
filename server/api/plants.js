const router = require('express').Router()
const {Plant, Type} = require('../db/models')
module.exports = router

// GET api/plants/
router.get('/', async (req, res, next) => {
  try {
    const plants = await Plant.findAll({include: Type})
    console.log('plants:', plants)
    res.json(plants)
  } catch (e) {
    next(e)
  }
})

// GET api/plants/${plant.id}
router.get('/:id', async (req, res, next) => {
  try {
    const plant = await Plant.findByPk(req.params.id, {include: Type})
    res.json(plant)
  } catch (e) {
    next(e)
  }
})

// POST /api/plant
router.post('/', async (req, res, next) => {
  try {
    const newPlant = await Plant.create(req.body)
    res.status(201).send(newPlant)
  } catch (e) {
    next(e)
  }
})

// PUT /api/plant/:id
router.put('/:id', async (req, res, next) => {
  try {
    const singlePlant = await Plant.findByPk(Number(req.params.id), {
      include: Type,
    })
    res.send(await singlePlant.update(req.body))
  } catch (e) {
    next(e)
  }
})

// DELETE /api/plant/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const singlePlant = await Plant.findByPk(Number(req.params.id))
    await singlePlant.destroy()
    res.send(singlePlant)
  } catch (e) {
    next(e)
  }
})
