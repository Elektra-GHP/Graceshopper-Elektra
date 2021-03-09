const {expect} = require('chai')
const db = require('../index')
const Cart = db.model('cart')

describe('Cart model', () => {
  beforeEach(() => db.sync({force: true}))

  describe('Column definitions and validations', () => {
    it('it has `complete`, `orderId`, `orderDate`, `shippingStatus`, and `shippingAddress`', async () => {
      const cart = await Cart.create({
        complete: false,
        orderId: 'abc123',
        orderDate: 'Thu Feb 04 2021 18:00:00 GMT-0500 (Eastern Standard Time)',
        shippingStatus: 'confirmed',
        shippingAddress: '123 fake st, NY NY 10003'
      })

      expect(cart.complete).to.equal(false)
      expect(cart.orderId).to.equal('abc123')
      expect(cart.orderDate).to.equal(
        'Thu Feb 04 2021 18:00:00 GMT-0500 (Eastern Standard Time)'
      )
      expect(cart.shippingStatus).to.equal('confirmed')
      expect(cart.shippingAddress).to.equal('123 fake st, NY NY 10003')
    })

    it('`complete` has a default value of false', async () => {
      const cart = await Cart.create({complete: false})
      expect(cart.complete).to.equal(false)
    })

    it('`orderId` has a default value of an empty string', async () => {
      const cart = await Cart.create({complete: false})
      expect(cart.orderId).to.equal('')
    })

    it('`orderDate` has a default value of an empty string', async () => {
      const cart = await Cart.create({complete: false})
      expect(cart.orderDate).to.equal('')
    })
    it('shippingStatus can only be either `pending`, `confirmed`, `shipped` , `delivered`', async () => {
      const cart = await Cart.create({complete: false})
      await expect(
        cart,
        "We shouldn't be able to create a cart with invalid shippingStatus (ordered)"
      ).to.be.rejected
    })
    it('`shippingStatus` has a default value of null', async () => {
      const cart = await Cart.create({complete: false})
      expect(cart.shippingStatus).to.equal(null)
    })

    it('`shippingAddress` has a default value of an empty string', async () => {
      const cart = await Cart.create({complete: false})
      expect(cart.shippingAddress).to.equal('')
    })
  }) // end describe('instanceMethods')
}) // end describe('User model')
