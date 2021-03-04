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
    // if (Array.isArray(carts))
    const cartsWithItems = {}
    // carts.forEach(cart =>)
    // want to also send plant info from each order
    // [{cart: {cartInfo}, plants: [{plant}, {plant}]}]
    res.send(cartsWithItems)
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
