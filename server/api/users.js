const router = require('express').Router()
const {User, Cart, Item, Plant} = require('../db/models')
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

// GET api/users/:id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {id: req.params.id}})
    res.json(user)
  } catch (error) {
    console.log('there was an error in GET api/users/:id')
    next(error)
  }
})

// GET api/users/:id/carts
router.get('/:id/carts', async (req, res, next) => {
  try {
    const carts = await Cart.findAll({
      where: {
        userId: req.params.id,
        complete: true,
      },
    })

    let cartsWithItems = []
    for (let i = 0; i < carts.length; i++) {
      const cart = carts[i]
      const plants = await cart.getPlants()
      cartsWithItems.push({cart, plants})
    }

    res.json(cartsWithItems)
  } catch (error) {
    console.log('there was an error in GET api/users/:id/carts')
    next(error)
  }
})

// PUT api/users/:id
router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {id: req.params.id}})
    const updatedUser = await user.update(req.body)
    res.json(updatedUser)
  } catch (error) {
    console.log('there was an error in PUT api/users/:id')
    next(error)
  }
})

// or should it be under /api/checkout/:userId ?
// PUT api/users/:id/checkout
router.put('/:id/checkout', async (req, res, next) => {
  try {
    console.log('in PUT api/users/:id/checkout route')
    const activeCart = await Cart.findOne({
      where: {
        userId: req.params.id,
        complete: false,
      },
    })
    console.log('in route, active cart:', activeCart)

    // find items with cart id
    // loop through, find each plant and subtract qty
    const cartItems = await Item.findAll({where: {cartId: activeCart.id}})
    console.log('cart items ----->', cartItems)
    const plantIdAndQty = []
    for (let i = 0; i < cartItems.length; i++) {
      let item = cartItems[i]
      plantIdAndQty.push({plantId: item.plantId, quantity: item.quantity})
      const plantOfItem = await Plant.findOne({where: {id: item.plantId}})
      const newQty = plantOfItem.inventory - item.quantity
      // if (newQty < 0) {
      //   throw new Error(`Sorry! We only have ${plantOfItem.inventory} ${plantOfItem.name}'s in stock.`)
      // }
      plantOfItem.update({inventory: newQty})
    }

    const complete = true
    const orderId = Math.random().toString(36).substr(2, 9)
    const orderDate = new Date().toString()
    const shippingAddress = req.body.shippingAddress
    const shippingStatus = 'pending'
    const updatedCart = await activeCart.update({
      complete,
      orderId,
      orderDate,
      shippingAddress,
      shippingStatus,
    })
    res.json(updatedCart)
  } catch (error) {
    console.log('there was an error in GET api/users/:id/checkout')
    next(error)
  }
})

// DELETE api/users/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {id: req.params.id}})
    await user.destroy()
    res.sendStatus(204)
  } catch (error) {
    console.log('there was an error in DELETE api/users/:id')
    next(error)
  }
})
