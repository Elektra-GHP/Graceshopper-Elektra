/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail,
      })
    })

    it('GET /api/users', async () => {
      const res = await request(app).get('/api/users').expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].email).to.be.equal(codysEmail)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')

describe('User Cart Route', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('api/users/:id/cart', () => {
    it('GET /api/users/:id/cart', async () => {
      const res = await request(app).get('/api/users/1/cart').expect(200)
      console.log('res.body ------->', res.body)
      expect(res.body).to.be.an('Array')
    })
  })
})
