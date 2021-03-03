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

Cart.hasMany(Item)
Item.belongsTo(Cart)

Plant.hasMany(Item)
Item.belongsTo(Plant)

Cart.hasOne(User)

module.exports = {
  User,
  Type,
  Plant,
  Cart,
  Item,
}
