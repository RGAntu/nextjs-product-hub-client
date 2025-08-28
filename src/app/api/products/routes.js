import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const body = await req.json();
    const productsCollection = await dbConnect(collectionNameObj.productsCollection);

    const result = await productsCollection.insertOne(body);

    return new Response(JSON.stringify({ message: "Product added", result }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}



