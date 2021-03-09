const {expect} = require('chai')
const db = require('../index')
const Type = db.model('type')

describe('Cart model', () => {
  beforeEach(() => db.sync({force: true}))

  describe('Column definitions and validations', () => {
    it('it has `name`, `description`, and`origin`', async () => {
      const type = await Type.create({
        name: 'Conifers',
        description:
          'Conifers are a group of cone-bearing seed plants, a subset of gymnosperms. Scientifically, they make up the division Pinophyta, also known as Coniferophyta or Coniferae. The division contains a single extant class, Pinopsida. All extant conifers are perennial woody plants with secondary growth',
        origin:
          'Conifer forests, though composed of few species, cover vast areas, as in this forest in the Cascade Range of western North America'
      })
      expect(type.name).to.equal('Conifers')
    }) // end describe('instanceMethods')
  }) // end describe('User model')
})
