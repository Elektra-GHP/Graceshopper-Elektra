'use strict'

const db = require('../server/db')
const {User, Family, Species, Plant} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const families = [
    {
      name: 'Cactaceae',
      description:
        'The cactus family (Cactaceae) consists of about 131 genera and 1,866 species of flowering plants, almost all of which are found in the New World. Most cacti are adapted to arid environments, though a number of species are native to rainforests and other tropical or subtropical areas. Many have succulent photosynthetic stems and reduced leaves that are often modified as spines. The flowers are typically showy with numerous petals. The following is a list of some of the major genera and species in the family Cactaceae, arranged alphabetically by common name or genus.',
      origin:
        'Cactaceae are native to the Americas, ranging from Patagonia in the south to parts of western Canada in the north—except for Rhipsalis baccifera, which also grows in Africa and Sri Lanka'
    },
    {
      name: 'Marantaceae',
      description:
        'The Marantaceae are a family, the arrowroot family, of flowering plants consisting of 31 genera and around 530 species, defining it as one of the most species rich families in its order.  They are commonly called the prayer-plant family and are also known for their unique secondary pollination presentation.',
      origin:
        'Species of this family are found in lowland tropical forests of Africa, Asia, and the Americas. The majority (80%) of the species are found in the American tropics, followed by Asian (11%) and African (9%) tropics.'
    },
    {
      name: 'Orchidaceae',
      description:
        'The orchid family (Orchidaceae) is the second largest family of flowering plants, with about 880 genera and some 26,000 species distributed nearly worldwide. Orchids are perennial herbs and feature unusual bilaterally symmetric flowers, with masses of pollen known as pollinia, and tiny, dustlike seeds. Many are grown as ornamentals for their showy flowers, and several are of economic importance as the source of the flavouring vanilla. The following is a list of some of the major genera and species in the family Orchidaceae, arranged alphabetically by common name or genus.',
      origin: 'worldwide'
    },
    {
      name: 'Araceae',
      description:
        'Plants in the Araceae are monocots. Most members of the arum family are tropical plants, though an obvious exception would be the Jack-in-the-Pulpit which grows extensively in the temperate zone. Vining forms often have large, fleshy aerial roots. Leaves can vary greatly in shape and many have deep lobes, slits or holes in them. The inflorescence of this family is unusual, consisting of an expanded, leaf-like spathe and a column of tiny flowers, the spadix. The spathe is often colorful, as in many anthuriums and the closet plant. The spadix may have male and female flowers or perfect flowers or all types. They are tropical and many suffer chilling injury at temperatures below 50oF. They are among the easiest houseplants to grow and among the most popular. Some members of the family have toxic sap. ',
      origin:
        'The 2,500 arum species are distributed worldwide, primarily in tropical and subtropical regions, where they grow in rainforests both on the ground and as epiphytes. Arums are generally absent from the arctic and deserts. Only eleven species occur in North America and other temperate northern regions.'
    }
  ]

  const [
    cactaceae,
    marantaceae,
    orchidaceae,
    araceae
  ] = await Family.bulkCreate(families)

  const species = [
    {
      name: 'Cactus',
      family: cactaceae.id
    },
    {
      name: 'Calathea',
      family: marantaceae.id
    },
    {
      name: 'Orchids',
      family: orchidaceae.id
    },
    {
      name: 'Devil’s ivy',
      family: araceae.id
    },
    {
      name: 'painter’s palette',
      family: araceae.id
    },
    {
      name: ' arum-lily',
      family: araceae.id
    }
  ]

  const [
    cactus,
    calathea,
    orchids,
    devilsIvy,
    paintersPalette,
    arumLily
  ] = await Species.bulkCreate(species)

  const plants = [
    {
      name: 'Golden Angel Wing Cactus',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/2198/4603/products/GoldenAngelWingCactus_BunnyEarCactus_1_1200x.jpg?v=1590507004',
      description:
        'Opuntia microdasys is an evergreen perennial that forms a dense shrub up to 24 inches (60 cm) tall (occasionally more), composed of green, pad-like stems, up to 6 inches (15 cm) long and up to 5 inches (12.5 cm) broad. It has no spines, but instead has numerous yellow glochids (micro-spines) up to 0.12 inch (3 mm) long at each aureole',
      price: 6.85,
      light: 'direct',
      water: 'weekly',
      humidity: 'low',
      species: cactus.id,
      family: cactaceae.id
    },
    {
      name: 'Dottie',
      imageUrl:
        'https://osera.org/wp-content/uploads/2020/08/calathea-dottie.jpg',
      description:
        'rare plant that is characterized by its rich dark purple leaves and bright pink markings',
      price: 19.99,
      light: 'indirect',
      water: 'weekly',
      humidity: 'high',
      species: calathea.id,
      family: marantaceae.id
    },
    {
      name: 'Stromanthe Triostar',
      imageUrl:
        'https://i1.wp.com/gratefulgreenlife.com/wp-content/uploads/2019/07/Stromanthe-Sanguinea-Triostar-3-1.jpg?resize=1000%2C667&ssl=1',
      description:
        'The Stromanthe Triostar is one of those sensational, star-quality plants you fall in love with immediately. Its artistically splashed green-and-white foliage glows with pinkish hues that demand attention—and boy, does it. This is not a beginner’s plant. Stromanthe triostar care can be filled with joy and heartbreak, but the effort is so worthwhile.',
      price: 44.99,
      light: 'indirect',
      water: 'weekly',
      humidity: 'high',
      species: calathea.id,
      family: marantaceae.id
    },
    {
      name: 'Lily',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNIPfxLqFeUwUqB--kMR4HCIb5VQK_HopKMg&usqp=CAU',
      description:
        'The flowers are large, often fragrant, and come in a wide range of colors including whites, yellows, oranges, pinks, reds and purples. Markings include spots and brush strokes. The plants are late spring- or summer-flowering.',
      price: 19.99,
      light: 'direct',
      water: 'daily',
      humidity: 'low',
      species: arumLily.id,
      family: araceae.id
    },

    {
      name: 'Old Lady Cactus',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeW3LYDtRmQH-Mh6SPBss5SiYHP3AFKI_ceQ&usqp=CAU',
      description:
        'Mammillaria hahniana, the old lady cactus, is a flowering plant in the family Cactaceae, native to central Mexico. It grows to 25 cm (10 in) tall by 50 cm (20 in) broad. The solitary spherical stems, 12 cm in diameter, are covered in white down and white spines. Reddish purple flowers are borne in spring and summer, sometimes forming a complete ring around the apex of the plant.',
      price: 12.99,
      light: 'direct',
      water: 'weekly',
      humidity: 'low',
      species: cactus.id,
      family: cactaceae.id
    },
    {
      name: 'Peacock Plant',
      imageUrl:
        'https://target.scene7.com/is/image/Target/GUEST_20ca1f9e-d6d7-4729-a643-e54320eeaac4?wid=488&hei=488&fmt=pjpeg',
      description:
        'The Peacock plant has all the elegance and beauty of a Peacock’s tail, which is why it has been given its rather glorious name. The leaves are pale green with a dark green feathered effect from the middle of the leaf to the outer edges. When new leaves grow they are rolled up and show off their pinkish-red undersides; giving it another splash of color.',
      price: 24.99,
      light: 'indirect',
      water: 'weekly',
      humidity: 'high',
      species: calathea.id,
      family: marantaceae.id
    },
    {
      name: 'Phalaenopsis amabilis',
      imageUrl:
        'https://t4.ftcdn.net/jpg/02/81/55/97/360_F_281559764_3iHD4OEwM6ops6VRw74hkVrHcgcGW3xQ.jpg',
      description:
        'Phalaenopsis, the moth orchid, is perhaps the best orchid for growing in the home, and is also a favorite with greenhouse growers. Well-grown plants can flower often, sometimes with a few flowers throughout the year, though the main season is late winter into spring.',
      price: 30.99,
      light: 'low',
      water: 'weekly',
      humidity: 'high',
      species: '',
      family: ''
    },
    {
      name: 'Tiger Lily',
      imageUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Lilium_lancifolium_7757.jpg/440px-Lilium_lancifolium_7757.jpg',
      description:
        'An Asian species of lily, native to China, Japan, Korea, and the Russian Far East. It is widely planted as an ornamental because of its showy orange-and-black flowers, and sporadically occurs as garden escape in North America, particularly the eastern United States including New England,  and has made incursions into some southern states such as Georgia.',
      price: 24.99,
      light: 'direct',
      water: 'daily',
      humidity: 'low',
      species: arumLily.id,
      family: araceae.id
    },
    {
      name: '',
      imageUrl: '',
      description: '',
      price: '',
      light: '',
      water: '',
      humidity: '',
      species: '',
      family: ''
    },

    {
      name: '',
      imageUrl: '',
      description: '',
      price: '',
      light: '',
      water: '',
      humidity: '',
      species: '',
      family: ''
    },
    {
      name: '',
      imageUrl: '',
      description: '',
      price: '',
      light: '',
      water: '',
      humidity: '',
      species: '',
      family: ''
    }
  ]

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
