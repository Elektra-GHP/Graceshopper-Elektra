/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Plant = db.model('plant')
const Type = db.model('type')

describe('Plant routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/plant/all', () => {
    const testplant1 = {
      name: 'Toxicodendron radicans',
      imageUrl:
        'https://www.uptodate.com/contents/images/PI/79136/PoisonivyoaksumacPI.jpg',
      description:
        'Toxicodendron radicans, commonly known as eastern poison ivy or poison ivy, is an allergenic Asian and Eastern North American flowering plant in the genus Toxicodendron.',
      inventory: 10,
      price: 20.0,
      light: 'direct',
      water: 'daily',
      humidity: 'high',
      typeId: 1,
    }
    const testplant2 = {
      name: 'Mangifera',
      imageUrl:
        'https://www.uptodate.com/contents/images/PI/79136/PoisonivyoaksumacPI.jpg',
      description:
        'Mangifera species are widely cultivated in Asia and elsewhere. More than 27 species in the genus bear edible, fleshy fruits, especially the Common Mango (M. indica). Others, such as M. foetida, yield astringent fruits that can be eaten pickled.',
      inventory: 11,
      price: 30.0,
      light: 'direct',
      water: 'daily',
      humidity: 'high',
      typeId: 1,
    }
    const testtype = {
      name: 'Cashew',
      description:
        'The cashew family or sumac family, are a family of flowering plants, including about 83 genera with about 860 known species.',
      origin: 'native to tropical Americas, Africa and India',
    }

    beforeEach(async () => {
      return Type.create(testtype)
    })

    it('GET /plant/all', async () => {
      await Plant.create(testplant1)
      await Plant.create(testplant2)
      const res = await request(app).get('/api/plant/all').expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(2)
      expect(res.body[0].name).to.be.equal(testplant1.name)
      expect(res.body[1].name).to.be.equal(testplant2.name)
    })

    it('GET /plant/:id', async () => {
      await Plant.create(testplant1)
      await Plant.create(testplant2)
      const res = await request(app).get('/api/plant/1').expect(200)

      //expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(testplant1.name)
    })
  }) // end describe('/api/plant')
}) // end describe('Plant routes')
