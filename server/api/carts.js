const router = require('express').Router()
const {Cart, Item} = require('../db/models')
const isCurrentUser = require('../utils/isCurrentUser')
module.exports = router

// GET api/carts/user/:id
router.get('/user/:id', isCurrentUser, async (req, res, next) => {
  console.log('req.user ---->', req.user)
  try {
    let cart = await Cart.findOne({
      where: {
        userId: req.params.id,
        complete: false,
      },
    })
    if (!cart) {
      cart = await Cart.create({userId: req.params.id})
    }
    res.json(await cart.getPlants())
  } catch (error) {
    console.log('there was an error in user/:id GET route')
    next(error)
  }
})

// GET api/carts/user/:id/confirmed
router.get('/user/:id/confirmed', isCurrentUser, async (req, res, next) => {
  try {
    let confirmedOrder = await Cart.findAll({
      limit: 1,
      where: {
        userId: req.params.id,
        complete: true,
      },
      order: [['orderDate', 'ASC']],
    })
    res.json(confirmedOrder)
  } catch (error) {
    console.log('there was an error in user/:id/confirmed GET route')
    next(error)
  }
})

// POST api/carts/user/:id
router.post('/user/:id', isCurrentUser, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {userId: req.params.id, complete: false},
    })
    await Item.create({
      plantId: req.body.plantId,
      cartId: cart.id,
      quantity: req.body.quantity,
    })
    res.json(await cart.getPlants())
  } catch (error) {
    console.log('there was an error in user/:id POST route')
    next(error)
  }
})

// PUT api/carts/user/:id
router.put('/user/:id', isCurrentUser, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {userId: req.params.id, complete: false},
    })
    const item = await Item.findOne({
      where: {
        plantId: req.body.plantId,
        cartId: cart.id,
      },
    })
    await item.update({
      quantity: req.body.quantity,
    })
    res.json(await cart.getPlants())
  } catch (error) {
    console.log('there was an error in user/:id/ PUT route')
    next(error)
  }
})

// DELETE api/carts/user/:id
router.delete('/user/:id', isCurrentUser, async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {userId: req.params.id, complete: false},
    })
    const item = await Item.findOne({
      where: {
        plantId: req.body.plantId,
        cartId: cart.id,
      },
    })
    await item.destroy()
    res.json(await cart.getPlants())
  } catch (error) {
    console.log('there was an error in user/:id DELETE route')
    next(error)
  }
})
