const router = require('express').Router()
const {Cart, Item} = require('../db/models')
module.exports = router

// GET api/carts/user/:id
router.get('/user/:id', async (req, res, next) => {
  //console.log('inside get route')
  try {
    let cart = await Cart.findOne({
      where: {
        userId: req.params.id,
        complete: false,
      },
    })
    //console.log('CART --->', cart)
    if (!cart) {
      cart = await Cart.create({userId: req.params.id})
    }
    //console.log('cart', cart)
    res.json(await cart.getPlants())
  } catch (error) {
    console.log('there was an error in user/:id GET route')
    next(error)
  }
})

// GET api/carts/user/:id/confirmed
router.get('/user/:id/confirmed', async (req, res, next) => {
  console.log('inside get confirmed route')
  try {
    let confirmedOrder = await Cart.findAll({
      limit: 1,
      where: {
        userId: req.params.id,
        complete: true,
      },
      order: [['orderDate', 'DESC']],
    })
    console.log('confirmedOrder --->', confirmedOrder)

    res.json({cart: confirmedOrder, items: await confirmedOrder.getPlants()})
  } catch (error) {
    console.log('there was an error in user/:id/confirmed GET route')
    next(error)
  }
})

// POST api/carts/user/:id
router.post('/user/:id', async (req, res, next) => {
  try {
    // adding to items
    // need plantId (req.body.plantId) and cartId
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
router.put('/user/:id', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({where: {userId: req.params.id}})
    const item = await Item.findOne({
      where: {
        plantId: req.body.plantId,
        cartId: cart.id,
      },
    })
    const editedItem = await item.update({
      quantity: req.body.quantity,
    })
    //res.json(editedItem)
    res.json(await cart.getPlants())
  } catch (error) {
    console.log('there was an error in user/:id/ PUT route')
    next(error)
  }
})

// DELETE api/carts/user/:id
router.delete('/user/:id', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({where: {userId: req.params.id}})
    const item = await Item.findOne({
      where: {
        plantId: req.body.plantId,
        cartId: cart.id,
      },
    })
    await item.destroy()
    //res.sendStatus(204)
    res.json(await cart.getPlants())
  } catch (error) {
    console.log('there was an error in user/:id DELETE route')
    next(error)
  }
})
