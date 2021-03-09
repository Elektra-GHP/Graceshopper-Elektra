/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Cart = db.model('cart')

xdescribe('Cart routes', () => {
  beforeEach(async () => {
    await Cart.create({})
    return db.sync({force: true})
  })

  describe('/api/carts/user/ URI', () => {
    let testCart
    beforeEach(() => {
      testCart = Cart.create()
      return testCart
    })

    it('GET /api/carts/users/:id', async () => {
      const res = await request(app)
        .get('/api/carts/user/:id')
        .expect(200)
      expect(res.body[0]).to.be.an('Object')
      expect(res.body[0]).to.have.property('sessionId')
    })
  }) // end describe('/api/carts')
}) // end describe('Cart routes')
