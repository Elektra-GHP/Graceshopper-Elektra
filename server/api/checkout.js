const router = require('express').Router()
const {Plant, Cart, Item} = require('../db/models')
module.exports = router

// PUT api/checkout/user/:id
router.put('/user/:id', async (req, res, next) => {
  try {
    const activeCart = await Cart.findOne({
      where: {
        userId: req.params.id,
        complete: false,
      },
    })

    // find items with cart id
    // loop through, find each plant and subtract qty
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
    console.log('there was an error in GET api/checkout/user/:id')
    next(error)
  }
})

/*
// PUT api/checkout/user/:id
router.put('/user/:id', async (req, res, next) => {
  try {
    const activeCart = await Cart.findOne({
      where: {
        userId: req.params.id,
        complete: false,
      },
    })

    // find items with cart id
    // loop through, find each plant and subtract qty
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

    Cart.create({userId: req.params.id})

    res.json(updatedCart)
  } catch (error) {
    console.log('there was an error in GET api/checkout/user/:id')
    next(error)
  }
})
*/
