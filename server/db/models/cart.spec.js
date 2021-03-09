const {expect} = require('chai')
const db = require('../index')
const Cart = db.model('cart')

describe.only('Cart model', () => {
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

    // describe.only('Sequelize model', () => {
    //   beforeEach(() => {
    //     return db.sync({force: true})
    //   })

    //   describe('Column definitions and validations', () => {
    //     describe('it has `complete`, `orderId`, `orderDate`, `shippingStatus`, and `shippingAddress`', () => {
    //       beforeEach(async () => {
    //         const cart = await Cart.create({
    //           complete: false,
    //           orderId: 'abc123',
    //           orderDate: 'Thu Feb 04 2021 18:00:00 GMT-0500 (Eastern Standard Time)',
    //           shippingStatus: 'confirmed',
    //           shippingAddress: '123 fake st, NY NY 10003'
    //         })
    //         // cart2 = await Cart.create({
    //         //   complete: true,
    //         //   orderId: 'aa3352j',
    //         //   orderDate: 'Thu Feb 04 2021 18:00:00 GMT-0500 (Eastern Standard Time)',
    //         //   shippingStatus: 'shipped',
    //         //   shippingAddress: '742 evergreen st, NY NY 10003'
    //         // })

    //         expect(cart.complete).to.equal("false")
    //       })
    //       // afterEach(() => db.sync({ force: true }));

    //       // it('returns true if the password is correct', () => {
    //       //   expect(cody.correctPassword('bones')).to.be.equal(true)
    //       // })

    //       // it('returns false if the password is incorrect', () => {
    //       //   expect(cody.correctPassword('bonez')).to.be.equal(false)
    //       // })
    // }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
