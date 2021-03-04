const User = require('./user')
const Type = require('./type')
const Plant = require('./plant')
const Cart = require('./cart')
const Item = require('./item')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

Type.hasMany(Plant)
Plant.belongsTo(Type)

Plant.belongsToMany(Cart, {through: Item})
Cart.belongsToMany(Plant, {through: Item})

User.hasMany(Cart)
Cart.belongsTo(User)

module.exports = {
  User,
  Type,
  Plant,
  Cart,
  Item,
}
