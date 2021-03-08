const router = require('express').Router()
const {Cart, Item, Plant} = require('../db/models')
module.exports = router

// var ID = function () {
//   return '_' + Math.random().toString(36).substr(2, 9)
// }
// if (!req.session.cookie.id) {
//   req.session.cookie.id = ID()
//   await Cart.create({sessionId: req.session.cookie.id})
// }

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
