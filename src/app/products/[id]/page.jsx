import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import Image from "next/image";
import { ObjectId } from "mongodb";

export default async function ProductDetails({ params }) {
  const { id } = params; 

  const productsCollection = dbConnect(collectionNameObj.productsCollection);
  const product = await productsCollection.findOne({ _id: new ObjectId(id) });

  if (!product) {
    return <p className="text-center mt-10">Product not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <Image
        src={product.image}
        width={600}
        height={400}
        alt={product.name}
        unoptimized
        className="rounded-lg mb-4"
      />
      <p className="mb-2 text-lg">{product.description}</p>
      <p className="text-xl font-semibold mb-2">${product.price}</p>
      <div className="flex gap-2 mt-4">
        {product.feature?.map((feat, idx) => (
          <span key={idx} className="badge badge-outline">
            {feat}
          </span>
        ))}
      </div>
    </div>
  );
}
