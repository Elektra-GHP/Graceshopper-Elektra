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

// USE api/carts/
router.use('/', async (req, res, next) => {
  try {
    // create a cart for a user if one doesn't already exist
    let cart = await Cart.findOne({
      where: {userId: req.params.id},
      // include: [Item]
    })

    next()
  } catch (e) {
    next(e)
  }
})
