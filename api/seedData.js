const { MongoClient } = require('mongodb');

const data = [
  {
    name: 'Ancient Valencia',
    priceUSDCents: 699,
    thumbnailURL: 'https://i.ibb.co/YZ7nkX9/valencia.jpg',
  },
  {
    name: 'Ancient Rome',
    priceUSDCents: 1399,
    thumbnailURL: 'https://i.ibb.co/BTPhGct/rome.jpg',
  },
  {
    name: 'Ancient Athens',
    priceUSDCents: 1399,
    thumbnailURL: 'https://i.ibb.co/HV6jrsV/athens.jpg',
  },
  {
    name: 'Ancient Jerusalem',
    priceUSDCents: 1399,
    thumbnailURL: 'https://i.ibb.co/Bjvj1Xt/The-Citadel-Tower-of-David.jpg',
  },
  {
    name: 'Ancient Barcelona',
    priceUSDCents: 699,
    thumbnailURL: 'https://i.ibb.co/ZKrJrdQ/barcelona.jpg',
  },
  {
    name: 'Ancient Corinth',
    priceUSDCents: 349,
    thumbnailURL: 'https://i.ibb.co/QJwSSTk/corinth.jpg',
  },
  {
    name: 'Ancient Delphi',
    priceUSDCents: 699,
    thumbnailURL: 'https://i.ibb.co/k5qJp7K/delphi.jpg',
  },
  {
    name: 'Ancient Lisbon',
    priceUSDCents: 699,
    thumbnailURL: 'https://i.ibb.co/Bfh9D1k/lisbon.jpg',
  },
  {
    name: 'Ancient Masada',
    priceUSDCents: 699,
    thumbnailURL:
      'https://i.ibb.co/Dg92YHM/Aerial-View-of-Masada-Israel-shot-from-a-helicopter-Masada-is-an-ancient-fortification-in-the-Southe.jpg',
  },
  {
    name: 'Ancient Olympia',
    priceUSDCents: 699,
    thumbnailURL: 'https://i.ibb.co/m48vdDp/olympia.jpg',
  },
];

async function seedDB() {
  // Connection URL
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();

    console.log('Connected correctly to server');

    const toursCollection = client.db('test').collection('tours');

    const list = await client
      .db('test1')
      .listCollections()
      .toArray();

    // The drop() command destroys all data from a collection.
    // Make sure you run it against proper database and collection.
    if (list.find(col => col.name === 'tours')) {
      toursCollection.drop();
    }

    await toursCollection.insertMany(data);

    console.log('Database seeded! :)');
    client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

seedDB();
