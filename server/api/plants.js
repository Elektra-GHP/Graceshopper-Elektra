const router = require('express').Router()
const {Plant, Type} = require('../db/models')
const adminsOnly = require('../utils/adminsOnly')
module.exports = router

// GET api/plants/
router.get('/page/:pageNum', async (req, res, next) => {
  try {
    let pageNum = req.params.pageNum
    console.log('get pageNum route', pageNum)
    const plants = await Plant.findAll({
      limit: 18,
      offset: 18 * pageNum,
      include: Type
    })
    res.json(plants)
  } catch (e) {
    next(e)
  }
})

// GET api/plants/types
router.get('/types', async (req, res, next) => {
  try {
    const types = await Type.findAll()
    res.json(types)
  } catch (error) {
    next(error)
    console.log('there was an error in GET api/types')
  }
})

//GET api/plants/types/:id
router.get(`/types/:id`, async (req, res, next) => {
  console.log('plants/types/:id')
  try {
    const id = +req.params.id
    const type = await Type.findByPk(id)
    console.log('type', type)
    res.json(type)
  } catch (error) {
    next(error)
    console.log('there was an error in GET api/plants/types/:id')
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

// POST /api/plants
router.post('/', adminsOnly, async (req, res, next) => {
  try {
    const newPlant = await Plant.create(req.body)
    res.status(201).send(newPlant)
  } catch (e) {
    next(e)
  }
})

// PUT /api/plants/:id
router.put('/:id', adminsOnly, async (req, res, next) => {
  try {
    const singlePlant = await Plant.findByPk(Number(req.params.id), {
      include: Type
    })
    res.send(await singlePlant.update(req.body))
  } catch (e) {
    next(e)
  }
})

// DELETE /api/plants/:id
router.delete('/:id', adminsOnly, async (req, res, next) => {
  try {
    const singlePlant = await Plant.findByPk(Number(req.params.id))
    await singlePlant.destroy()
    res.send(singlePlant)
  } catch (e) {
    next(e)
  }
})
