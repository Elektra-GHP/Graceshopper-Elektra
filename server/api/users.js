const router = require('express').Router()
const {User, Cart, Item} = require('../db/models')
module.exports = router

// GET api/users/
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email'],
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET api/users/:id/cart
router.get('/:id/cart', async (req, res, next) => {
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
    console.log('there was an error in user/:id/cart GET route')
    next(error)
  }
})

// POST api/users/:id/cart
router.post('/:id/cart', async (req, res, next) => {
  try {
    // adding to items
    // need plantId (req.body.plantId) and cartId
    const cart = await Cart.findOne({where: {userId: req.params.id}})
    const newItem = await Item.create({
      plantId: req.body.plantId,
      cartId: cart.id,
      quantity: req.body.quantity,
    })
    res.json(newItem)
  } catch (error) {
    console.log('there was an error in user/:id/cart POST route')
    next(error)
  }
})

// change quantity of item
// PUT api/users/:id/cart
router.put('/:id/cart', async (req, res, next) => {
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
    res.json(editedItem)
  } catch (error) {
    console.log('there was an error in user/:id/cart PUT route')
    next(error)
  }
})

// DELETE api/users/:id/cart
router.delete('/:id/cart', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({where: {userId: req.params.id}})
    const item = await Item.findOne({
      where: {
        plantId: req.body.plantId,
        cartId: cart.id,
      },
    })
    await item.destroy()
    res.sendStatus(204)
  } catch (error) {
    console.log('there was an error in user/:id/cart DELETE route')
    next(error)
  }
})
