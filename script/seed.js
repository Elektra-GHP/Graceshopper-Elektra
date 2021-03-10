'use strict'

const db = require('../server/db')
const {User, Type, Plant, Item, Cart} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = [
    {
      name: 'Cody',
      email: 'cody@email.com',
      password: '123',
    },
    {
      name: 'Murphy',
      email: 'murphy@email.com',
      password: '123',
    },
    {
      name: 'Cooper',
      isAdmin: true,
      email: 'cooper@email.com',
      password: '123',
    },
  ]

  const [cody, murphy, cooper] = await Promise.all(
    users.map((user) => User.create(user))
  )

  const carts = [
    {userId: cody.id},
    {userId: murphy.id},
    {userId: cooper.id},
    {
      userId: cody.id,
      complete: true,
      orderId: '123sdfg',
      orderDate: 'Thu Feb 04 2021 18:00:00 GMT-0500 (Eastern Standard Time)',
      shippingStatus: 'delivered',
      shippingAddress: '123 Puppy Way, New York, NY',
    },
    {
      userId: cody.id,
      complete: true,
      orderId: '125sdfb',
      orderDate: 'Sun Feb 28 2021 10:31:26 GMT-0500 (Eastern Standard Time)',
      shippingStatus: 'shipped',
      shippingAddress: '123 Puppy Way, New York, NY',
    },
    {
      userId: murphy.id,
      complete: true,
      orderId: '345asdc',
      orderDate: 'Fri Mar 05 2021 05:22:49 GMT-0500 (Eastern Standard Time)',
      shippingStatus: 'pending',
      shippingAddress: '234 Doggy Lane, New York, NY',
    },
  ]

  const [
    codyCart,
    murphyCart,
    cooperCart,
    codyCompleted1,
    codyCompleted2,
    murphyCompleted,
  ] = await Promise.all(carts.map((cart) => Cart.create(cart)))

  const types = [
    {
      name: 'Cactus',
      description:
        'The cactus family (Cactaceae) consists of about 131 genera and 1,866 species of flowering plants, almost all of which are found in the New World. Most cacti are adapted to arid environments, though a number of species are native to rainforests and other tropical or subtropical areas. Many have succulent photosynthetic stems and reduced leaves that are often modified as spines. The flowers are typically showy with numerous petals. The following is a list of some of the major genera and species in the family Cactaceae, arranged alphabetically by common name or genus.',
      origin:
        'Cacti are native to the Americas, ranging from Patagonia in the south to parts of western Canada in the north—except for Rhipsalis baccifera, which also grows in Africa and Sri Lanka.',
    },
    {
      name: 'Calathea',
      description:
        ' Many of the species are popular as pot plants due to their decorative leaves and, in some species, colorful inflorescences. They are commonly called calatheas or (like their relatives) prayer plants.',
      origin: 'Native to the tropical Americas',
    },
    {
      name: 'Orchids',
      description:
        'The orchid family is a diverse and widespread family of flowering plants, with blooms that are often colourful and fragrant. The number of orchid species is nearly equal to the number of bony fishes, more than twice the number of bird species, and about four times the number of mammal species.',
      origin:
        'Orchids are cosmopolitan, occurring in almost every habitat apart from glaciers.',
    },
    {
      name: 'Devil’s ivy',
      description:
        'It is a gorgeous vining plant with heart - shaped leaves that are variegated in green and yellow. It is a fast grower, hardy, and can tolerate a wide variety of growing conditions. The vines can reach 10′ or longer, making them ideal for hanging baskets where they will create beautiful draping foliage.',
      origin:
        'This plant is a native of Australia, Indonesia, China, Japan and India.',
    },
    {
      name: 'Painter’s Palette',
      description:
        'The Painter’s Palette has arrow shaped and highly polished leaves with an almost unreal looking appearance, which may get people wondering if the plant is genuine or artificial.The leaf or spathe surrounding the flowering spike is normally red, cream or purple but either way the flower spike itself is always straight.',
      origin: 'Native to Columbia and Ecuador.',
    },
    {
      name: 'Arum-lily',
      description:
        'Arum lily is a robust, dark green, succulent herb, also known as calla or white arum lily. It was introduced to WA from South Africa as a garden plant and subsequently escaped to become established as a weed. It is found in creeks, irrigation ditches and areas of summer-moist land in the higher rainfall south west of WA, often forming large dense clumps.',
      origin: 'Native to South Africa',
    },
    {
      name: 'Stromanthe',
      description:
        "Stromanthe sanguinea, commonly called stromanthe, is an upright rhizomatous perennial that typically grows to 5' tall and 3' wide outdoors but to a more modest 2-3' tall when grown indoors as a houseplant.",
      origin: 'native to rainforests in Brazil',
    },
    {
      name: 'Maranta',
      description: `The crowded oval, evergreen leaves are undivided with sheathing stalks. The leaves are flat by day and folded up as the day comes to an end, hence the common name "prayer plant" which attaches to the genus and its species.`,
      origin:
        'native to tropical Central and South America and the West Indies',
    },
    {
      name: 'Test',
      description: 'Test test test test test',
      origin: 'test',
    },
    {
      name: 'Pachira',
      description:
        'Pachira is a genus of tropical trees. They are classified in the subfamily Bombacoideae of the family Malvaceae. Previously the genus was assigned to Bombacaceae. Prior to that the genus was found in the Sterculiaceae. Some 77 species have been identified.',
      origin: 'Central and South America, Africa and India.',
    },
    {
      name: 'Ficus',
      description:
        'Ficus is a genus of about 850 species of woody trees, shrubs, vines, epiphytes and hemiepiphytes in the family Moraceae. Collectively known as fig trees or figs.',
      origin:
        'They are native throughout the tropics with a few species extending into the semi-warm temperate zone.',
    },
    {
      name: 'Bird-of-paradise',
      description:
        'The Strelitziaceae comprise a family of monocotyledonous flowering plants, very similar in appearance and growth habit to members of the related families Heliconiaceae and Musaceae.',
      origin: 'originates from South Africa',
    },
  ]

  const [
    cactus,
    calathea,
    orchids,
    devilsIvy,
    paintersPalette,
    arumLily,
    stromanthe,
    maranta,
    test,
    pachira,
    fig,
    birdOfParadise,
  ] = await Promise.all(types.map((type) => Type.create(type)))

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
      typeId: cactus.id,
    },
    {
      name: 'Dottie',
      imageUrl:
        'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSuoHU0517UqThVgnHHyPMnNjuH6kpITKvxZNqRdBdOUhaC8ZdG7wLkbSi5_EC2uXIG5kQyeDuFaFsVFXMskaDJcvHJeO9SQ_n-K0ebOw7oiz7j3rtZ75hVKpM&usqp=CAE',
      description:
        'rare plant that is characterized by its rich dark purple leaves and bright pink markings',
      price: 19.99,
      light: 'indirect',
      water: 'weekly',
      humidity: 'high',
      typeId: calathea.id,
    },
    {
      name: 'Stromanthe Triostar',
      imageUrl:
        'https://cdn11.bigcommerce.com/s-uemzj79jf9/images/stencil/2048x2048/products/1296/2563/StromantheTriostar_510x__81059.1553886583.jpg?c=2',
      description:
        'The Stromanthe Triostar is one of those sensational, star-quality plants you fall in love with immediately. Its artistically splashed green-and-white foliage glows with pinkish hues that demand attention—and boy, does it. This is not a beginner’s plant. Stromanthe triostar care can be filled with joy and heartbreak, but the effort is so worthwhile.',
      price: 44.99,
      light: 'indirect',
      water: 'weekly',
      humidity: 'high',
      typeId: stromanthe.id,
    },
    {
      name: 'Lily',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhHA1XMCJL3nfxo1IYkdDPf3ni0xrrU8FTX4PczVBFxJGKI_qy_EiwKJrHEClni11BCI3LAoU&usqp=CAc',
      description:
        'The flowers are large, often fragrant, and come in a wide range of colors including whites, yellows, oranges, pinks, reds and purples. Markings include spots and brush strokes. The plants are late spring- or summer-flowering.',
      price: 19.99,
      light: 'direct',
      water: 'daily',
      humidity: 'low',
      typeId: arumLily.id,
    },

    {
      name: 'Old Lady Cactus',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1124/9666/products/Mammillaria-_Old-Lady-Cactus_-2_2000x.png?v=1478661100',
      description:
        'Mammillaria hahniana, the old lady cactus, is a flowering plant in the family Cactaceae, native to central Mexico. It grows to 25 cm (10 in) tall by 50 cm (20 in) broad. The solitary spherical stems, 12 cm in diameter, are covered in white down and white spines. Reddish purple flowers are borne in spring and summer, sometimes forming a complete ring around the apex of the plant.',
      price: 12.99,
      light: 'direct',
      water: 'weekly',
      humidity: 'low',
      typeId: cactus.id,
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
      typeId: calathea.id,
    },
    {
      name: 'Phalaenopsis amabilis',
      imageUrl:
        'https://allensflowers.imgix.net/images/itemVariation/WhitePhalSingle-18120375427.png?auto=format&w=375&h=450&fit=crop',
      description:
        'Phalaenopsis, the moth orchid, is perhaps the best orchid for growing in the home, and is also a favorite with greenhouse growers. Well-grown plants can flower often, sometimes with a few flowers throughout the year, though the main season is late winter into spring.',
      price: 30.99,
      light: 'indirect',
      water: 'weekly',
      humidity: 'high',
      typeId: orchids.id,
    },
    {
      name: 'Tiger Lily',
      imageUrl:
        'https://anniebrook.com.au/wp-content/uploads/2017/11/GFJMcS9928OR-2.jpg',
      description:
        'An Asian species of lily, native to China, Japan, Korea, and the Russian Far East. It is widely planted as an ornamental because of its showy orange-and-black flowers, and sporadically occurs as garden escape in North America, particularly the eastern United States including New England,  and has made incursions into some southern states such as Georgia.',
      price: 24.99,
      light: 'direct',
      water: 'daily',
      humidity: 'low',
      typeId: arumLily.id,
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
      typeId: calathea.id,
    },

    {
      name: 'Vanilla',
      imageUrl:
        'http://cdn.shopify.com/s/files/1/1780/8157/articles/Vanilla-Orchid_1200x1200.jpg?v=1570712133',
      description:
        'The vanilla orchid (Vanilla planifolia) is the only orchid that produces an edible fruit.',
      price: 35.25,
      light: 'direct',
      water: 'daily',
      humidity: 'high',
      typeId: orchids.id,
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
      typeId: maranta.id,
    },
    {
      name: 'Satin Pothos',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/1752/4567/products/pothos_silver_satin_6_1c3adc93-ed2e-4650-a5b5-8610f123dea8.png?v=1536193862',
      description:
        'A charming indoor plant for a houseplant lover of any level, the Silver Satin Pothos makes a beautiful splash of greenery to any space. Each leaf is vastly unique with silver and green hues that feature a shimmery sheen. This fast grower is easy to keep alive and requires very little maintenance.',
      price: 29.99,
      light: 'indirect',
      water: 'weekly',
      humidity: 'high',
      typeId: devilsIvy.id,
    },
    {
      name: 'Humboldt’s Lily',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0y_CxNPO8qYI3wt51hVH2IipuCPN2A5dmMQ&usqp=CAU',
      description:
        'Humboldt’s Lily grows up to 6 feet tall, with flowers that are maroon-spotted, golden-orange with dark red splotches, with orange to brown stamens. The plant flowers in June, with flowers growing in a pyramidal inflorescence. The flowers are on stout stems, which are sometimes brown-purple. The subrhizomatous bulb is large, with yellowish-white scales, and grows very deep in the soil. The leaves grow in whorls, and are undulate, shiny, and oblanceolate. It is summer-deciduous, dying back after flowering in mid- to late summer.',
      price: 29.99,
      light: 'direct',
      water: 'daily',
      humidity: 'low',
      typeId: arumLily.id,
    },
    {
      name: 'Brazilian Philodendron',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0212/1030/0480/products/Philodendron-Brasil-Potted-Plant.jpg?v=1597677452',
      description:
        'The Brazilian Philodendron  offers a colorful twist on a classic houseplant and is surprisingly easy to care for. With heart-shaped leaves in different shades of green and yellow, this trailing plant earned its name thanks to the close resemblance to the Brazilian flag.',
      price: 19.99,
      light: 'indirect',
      water: 'weekly',
      humidity: 'high',
      typeId: devilsIvy.id,
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
      typeId: cactus.id,
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
      typeId: cactus.id,
    },
    {
      name: 'Pachira Aquatica',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0873/8150/products/4dd7a18909c439f7999a92088e85dcf1_dde88803-f103-4c01-88bb-605b871a8497.jpg?v=1572067625',
      description:
        'Also known as the money tree, guiana chestnut, or the saba nut, Pachira aquatica is native to the tropics and thrives near wetlands and swamps. It loves moist soil; hence, the kill-proof factor. It also does well in indirect light, so growing it indoors is no problem—just position it in a fairly sunny spot.',
      price: 29.25,
      inventory: 0,
      light: 'indirect',
      water: 'bi-weekly',
      humidity: 'high',
      typeId: pachira.id,
    },
    {
      name: 'Fiddle Leaf Fig Tree',
      imageUrl:
        'http://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_large-fiddle-leaf-fig-bush_variant_large_hyde_black_1200x.jpg?v=1606159741',
      description:
        'Ficus lyrata, commonly known as the fiddle-leaf fig, is a species of flowering plant in the mulberry and fig family Moraceae. It is native to western Africa, from Cameroon west to Sierra Leone, where it grows in lowland tropical rainforest. It can grow up to 12–15 m tall.',
      price: 140.0,
      light: 'direct',
      water: 'weekly',
      humidity: 'low',
      typeId: fig.id,
    },
    {
      name: 'Weeping Fig',
      imageUrl:
        'https://www.houseplantsexpert.com/image-files/ficus-benjamina.jpg',
      description:
        'With large arching branches and long pointed leaves, the weeping fig looks attractive indoors (apart from leaves dropping). The Benjamina is one of the most popular small indoor trees from this genus that grows quite slowly and needs a grower to take particular care of a few needs (lighting, watering, etc.), which is fairly easy, when you know how.',
      price: 25.0,
      light: 'direct',
      water: 'bi-weekly',
      humidity: 'medium',
      typeId: fig.id,
    },
    {
      name: 'Rubber Fig',
      imageUrl:
        'https://www.gardeningknowhow.com/wp-content/uploads/2008/05/rubber-plant-400x533.jpg',
      description:
        'The rubber plant is the less finicky sister of the fiddle leaf that you can tame down to 1-foot tall with pruning. It’s deep, green leaves have a rubbery look that is v bold.',
      price: 95.9,
      light: 'indirect',
      water: 'bi-weekly',
      humidity: 'medium',
      typeId: fig.id,
    },
    {
      name: 'Bird of Paradise',
      imageUrl:
        'https://secure.img1-fg.wfcdn.com/im/01632478/compr-r85/7454/74547322/bird-of-paradise-with-blooms-flowering-plant-in-pot.jpg',
      description:
        'Another tropical fave, the giant bird of paradise plant has tall stems with banana-like leaves. Flowers can develop, but unfortunately they don’t typically appear indoors.',
      price: 102.99,
      light: 'direct',
      water: 'bi-weekly',
      humidity: 'medium',
      typeId: birdOfParadise.id,
    },
    {
      name: 'White Bird of Paradise',
      imageUrl:
        'https://secure.img1-fg.wfcdn.com/im/05826439/compr-r85/7454/74547390/bird-of-paradise-plant-in-pot.jpg',
      description: 'Similar to Bird of Paradise.',
      price: 25.0,
      light: 'direct',
      water: 'bi-weekly',
      humidity: 'medium',
      typeId: birdOfParadise.id,
    },
  ]

  const plantsInDb = await Promise.all(
    plants.map((plant) => Plant.create(plant))
  )

  for (let i = 0; i < 100; i++) {
    await Plant.create({
      name: `Test Plant No. ${i}`,
      description: 'Test plant. Lorem ipsum plant plant plant.',
      price: 5.0,
      typeId: test.id,
    })
  }

  const plantNameObj = {}
  plantsInDb.forEach(function (plant) {
    plantNameObj[plant.name] = plant.id
  })

  const cartItems = [
    {
      quantity: 1,
      cartId: codyCart.id,
      userId: cody.id,
      plantId: plantNameObj['Rattlesnake Plant'],
    },
    {
      quantity: 2,
      cartId: codyCart.id,
      userId: cody.id,
      plantId: plantNameObj['Old Lady Cactus'],
    },
    {
      quantity: 1,
      cartId: murphyCart.id,
      userId: murphy.id,
      plantId: plantNameObj['Rattlesnake Plant'],
    },
    {
      quantity: 2,
      cartId: murphyCart.id,
      userId: murphy.id,
      plantId: plantNameObj.Dottie,
    },
    {
      quantity: 1,
      cartId: codyCompleted1.id,
      plantId: plantNameObj.Dottie,
    },
    {
      quantity: 3,
      cartId: codyCompleted1.id,
      userId: cody.id,
      plantId: plantNameObj['Old Lady Cactus'],
    },
    {
      quantity: 1,
      cartId: codyCompleted2.id,
      userId: cody.id,
      plantId: plantNameObj['Golden Angel Wing Cactus'],
    },
    {
      quantity: 2,
      cartId: codyCompleted2.id,
      userId: cody.id,
      plantId: plantNameObj['Peacock Plant'],
    },
    {
      quantity: 4,
      cartId: codyCompleted2.id,
      userId: cody.id,
      plantId: plantNameObj.Lily,
    },
    {
      quantity: 3,
      cartId: codyCompleted2.id,
      userId: cody.id,
      plantId: plantNameObj['Tiger Lily'],
    },
    {
      quantity: 1,
      cartId: murphyCompleted.id,
      userId: murphy.id,
      plantId: plantNameObj['Rattlesnake Plant'],
    },
    {
      quantity: 2,
      cartId: murphyCompleted.id,
      userId: murphy.id,
      plantId: plantNameObj.Dottie,
    },
    {
      quantity: 1,
      cartId: cooperCart.id,
      userId: cooper.id,
      plantId: plantNameObj['Rattlesnake Plant'],
    },
    {
      quantity: 2,
      cartId: cooperCart.id,
      userId: cooper.id,
      plantId: plantNameObj['Tiger Lily'],
    },
  ]

  await Promise.all(cartItems.map((item) => Item.create(item)))

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
