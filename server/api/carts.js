const router = require('express').Router()
const {Cart, Item} = require('../db/models')
module.exports = router

// USE api/carts/:sessionId

var ID = function() {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  )
}

router.use('/', async (req, res, next) => {
  try {
    if (!req.session.cookie.id) {
      req.session.cookie.id = ID()
    }
    const cart = await Cart.findOrCreate({
      where: {
        sessionId: req.session.cookie.id
      },
      include: Item
    })
    console.log('Cart -->', cart)
    res.json(cart)
  } catch (e) {
    next(e)
  }
})
