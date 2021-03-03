const router = require('express').Router()
const {Cart, Item, Plant} = require('../db/models')
module.exports = router

var ID = function () {
  return '_' + Math.random().toString(36).substr(2, 9)
}

// USE api/carts/
router.use('/', async (req, res, next) => {
  try {
    if (!req.session.cookie.id) {
      req.session.cookie.id = ID()
      await Cart.create({sessionId: req.session.cookie.id})
    }
    next()
  } catch (e) {
    next(e)
  }
})

// GET api/carts/
router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {sessionId: req.session.cookie.id},
      // include: [Item]
    })
    // const cart = await Cart.findOrCreate({
    //   where: {
    //     sessionId: req.session.cookie.id
    //   },
    //   include: [Item]
    // })
    const testItem = await Item.create({
      quantity: 2,
      cartId: cart.id,
      plantId: 2,
    })
    await Item.create({quantity: 1, cartId: cart.id, plantId: 11})
    const cartItems = await Item.findAll({
      where: {cartId: cart.id},
      include: [Plant],
    })
    console.log('Cart -->', cart)
    console.log('testItem -->', testItem)
    console.log('cartItems -->', cartItems)

    res.json(cartItems)
  } catch (e) {
    next(e)
  }
})
