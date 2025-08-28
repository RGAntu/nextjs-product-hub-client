// import { MongoClient, ServerApiVersion } from "mongodb";

// let client;
// let clientPromise;

// if (!process.env.MONGODB_URI) throw new Error("Please define MONGODB_URI in .env");

// if (!client) {
//   client = new MongoClient(process.env.MONGODB_URI, {
//     serverApi: {
//       version: ServerApiVersion.v1,
//       strict: true,
//       deprecationErrors: true,
//     },
//   });
//   clientPromise = client.connect();
// }

// export const collectionNameObj = {
//   productsCollection: "products",
// };

// export default async function dbConnect(collectionName) {
//   const connectedClient = await clientPromise;
//   return connectedClient.db(process.env.DB_NAME).collection(collectionName);
// }


import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNameObj = {
  productsCollection: "products",
};

let cachedClient = null;

export default async function dbConnect(collectionName) {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME;

  if (!uri) throw new Error("Please define MONGODB_URI in .env");
  if (!dbName) throw new Error("Please define DB_NAME in .env");

  if (cachedClient) return cachedClient.db(dbName).collection(collectionName);

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  cachedClient = client;

  return client.db(dbName).collection(collectionName);
}
