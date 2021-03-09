const router = require('express').Router()
const {Plant, Cart, Item} = require('../db/models')
module.exports = router

// PUT api/checkout/user/:id
router.put('/user/:id', async (req, res, next) => {
  try {
    // this query is quite common - can we wrap it in a class method in our model code for reusability?
    const activeCart = await Cart.findOne({
      where: {
        userId: req.params.id,
        complete: false,
      },
    })

    const cartItems = await Item.findAll({where: {cartId: activeCart.id}})

    const plantIdAndQty = []
    for (let i = 0; i < cartItems.length; i++) {
      let item = cartItems[i]
      plantIdAndQty.push({plantId: item.plantId, quantity: item.quantity})
      const plantOfItem = await Plant.findOne({where: {id: item.plantId}})
      const newQty = plantOfItem.inventory - item.quantity
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

    const newCart = Cart.create({userId: req.params.id})
    console.log('new cart in route:', newCart)

    res.json(updatedCart)
  } catch (error) {
    console.log('there was an error in PUT api/checkout/user/:id')
    next(error)
  }
})

// POST api/checkout/guest
router.post('/guest', async (req, res, next) => {
  try {
    const newCart = await Cart.create({
      userId: null,
    })

    const cartItems = []

    for (let i = 0; i < req.body.cart.length; i++) {
      const plant = req.body.cart[i].item
      plant.cartId = newCart.id
      const item = await Item.create(plant)
      cartItems.push(item)
    }

    // similar logic in the other checkout function - can we make it more DRY?
    for (let i = 0; i < cartItems.length; i++) {
      let item = cartItems[i]
      const plantOfItem = await Plant.findOne({where: {id: item.plantId}})
      const newQty = plantOfItem.inventory - item.quantity
      plantOfItem.update({inventory: newQty})
    }

    const complete = true
    const orderId = Math.random().toString(36).substr(2, 9)
    const orderDate = new Date().toString()
    const shippingAddress = req.body.shippingAddress
    const shippingStatus = 'pending'
    const updatedCart = await newCart.update({
      complete,
      orderId,
      orderDate,
      shippingAddress,
      shippingStatus,
    })

    res.json(updatedCart)
  } catch (error) {
    console.log('there was an error in POST api/checkout/guest')
    next(error)
  }
})
