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
      species: orchids.id,
      family: orchidaceae.id
    },
    {
      name: 'Tiger Lily',
      imageUrl:
        'https://i.etsystatic.com/8732782/r/il/55a16e/1197239532/il_570xN.1197239532_9eqo.jpg',
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
      name: 'Rattlesnake Plant',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0662/5489/products/Calathea_lancifolia_-_rattlesnake_plant_-_pistils_nursery.jpg?v=1609194468',
      description:
        'One of the very best indoor ornamental houseplants, Rattlesnake Calathea has long, medium green leaves with dark decorative spots. The undersides of the leaves are deep purple. A beautiful accent plant for the home or patio, Calathea lancifolia grows to 30" tall and creates a magnificent specimen.',
      price: 29.99,
      light: 'indirect',
      water: 'weekly',
      humidity: 'high',
      species: calathea.id,
      family: marantaceae.id
    },

    {
      name: 'Vanilla',
      imageUrl:
        'https://i.pinimg.com/originals/75/a0/ac/75a0acb4ea77b18022cd1288e97c3937.jpg',
      description:
        'The vanilla orchid (Vanilla planifolia) is the only orchid that produces an edible fruit.',
      price: 35.25,
      light: 'direct',
      water: 'daily',
      humidity: 'high',
      species: orchids.id,
      family: orchidaceae.id
    },
    {
      name: 'Red Prayer Plant',
      imageUrl:
        'https://i.etsystatic.com/21083994/r/il/a6365e/2724118680/il_794xN.2724118680_h038.jpg',
      description:
        'The Maranta plant is a prostrate evergreen species that rises from rhizomes. It grows 12-15 inches (30-38 cm.) tall. The beautiful foliage is broadly oval and features 5-inch (13 cm.) long olive-green leaves with prominent red midribs and veining in a herringbone design. The center of the leaf is a lighter green and the undersides are even lighter still. The best thing about the plant is its ability to “pray.” This is called a nastic movement and is the plant’s response to light. During the day the leaves are flat, but at night they move upward as if praying to the heavens. This also allows the plant to conserve moisture at night.',
      price: 15.99,
      light: 'indirect',
      water: 'weekly',
      humidity: 'high',
      species: calathea.id,
      family: marantaceae.id
    },
    {
      name: 'Satin Pothos',
      imageUrl: 'https://www.ourhouseplants.com/imgs-content/pothos_satin.jpg',
      description:
        'A charming indoor plant for a houseplant lover of any level, the Silver Satin Pothos makes a beautiful splash of greenery to any space. Each leaf is vastly unique with silver and green hues that feature a shimmery sheen. This fast grower is easy to keep alive and requires very little maintenance.',
      price: 29.99,
      light: 'indirect',
      water: 'weekly',
      humidity: 'high',
      species: devilsIvy.id,
      family: araceae.id
    },
    {
      name: 'Humboldt’s Lily',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0y_CxNPO8qYI3wt51hVH2IipuCPN2A5dmMQ&usqp=CAU',
      description:
        'Humboldt’s Lilygrows up to 6 feet tall, with flowers that are maroon-spotted, golden-orange with dark red splotches, with orange to brown stamens. The plant flowers in June, with flowers growing in a pyramidal inflorescence. The flowers are on stout stems, which are sometimes brown-purple. The subrhizomatous bulb is large, with yellowish-white scales, and grows very deep in the soil. The leaves grow in whorls, and are undulate, shiny, and oblanceolate. It is summer-deciduous, dying back after flowering in mid- to late summer.',
      price: 29.99,
      light: 'direct',
      water: 'daily',
      humidity: 'low',
      species: arumLily.id,
      family: araceae.id
    },
    {
      name: 'Brazilian Philodendron',
      imageUrl:
        'https://i.etsystatic.com/22612434/r/il/a201a5/2459085376/il_794xN.2459085376_ewk0.jpg',
      description:
        'The Brazilian Philodendron  offers a colorful twist on a classic houseplant and is surprisingly easy to care for. With heart-shaped leaves in different shades of green and yellow, this trailing plant earned its name thanks to the close resemblance to the Brazilian flag.',
      price: 19.99,
      light: 'indirect',
      water: 'weekly',
      humidity: 'high',
      species: devilsIvy.id,
      family: araceae.id
    },
    {
      name: 'Easter Cactus',
      imageUrl:
        'https://www.logees.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/s/7/s7835-4-large.jpg',
      description:
        'Native to Brazil, the easter cactus blooms in late winter and early spring. Its flowers vary from whites to oranges to lavenders. The plant’s spines are stacked on top of each other, giving it a unique shape.',
      price: 35.99,
      light: 'indirect',
      water: 'weekly',
      humidity: 'medium',
      species: cactus.id,
      family: cactaceae.id
    },
    {
      name: 'Barrel Cactus',
      imageUrl:
        'https://microplantstudio.com/wp-content/uploads/2020/04/barrol-cactus.jpg',
      description:
        'The barrel cactus is named after its barrel or circular shape. Ribs line the sides of the plant and spiky spines grow from them. Some popular varieties include the golden barrel, california barrel, fishhook cactus, blue barrel and colviller’s barrel. Flowers bloom in May and June, showing off red or yellow colors.',
      price: 25.0,
      light: 'indirect',
      water: 'weekly',
      humidity: 'low',
      species: cactus.id,
      family: cactaceae.id
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
