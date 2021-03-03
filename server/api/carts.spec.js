/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Cart = db.model('cart')
const Item = db.model('item')

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    //const codysEmail = 'cody@puppybook.com'
    let testCart
    beforeEach(() => {
      // return User.create({
      //   email: codysEmail
      // })
      testCart = Cart.create()
      return testCart
    })

    it('GET /api/carts/', async () => {
      const res = await request(app)
        .get('/api/carts')
        .expect(200)
      expect(res.body[0]).to.be.an('Object')
      expect(res.body[0]).to.have.property('sessionId')
    })
  }) // end describe('/api/carts')
}) // end describe('Cart routes')
